const YOUTUBE_UPLOAD_URL = 'https://www.googleapis.com/upload/youtube/v3/videos';
const YOUTUBE_THUMBNAIL_URL = 'https://www.googleapis.com/youtube/v3/thumbnails/set';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

interface UploadMetadata {
  title: string;
  description: string;
  tags: string[];
  categoryId?: string;
  privacyStatus?: 'private' | 'unlisted' | 'public';
  madeForKids?: boolean;
  thumbnail?: File;
  notifySubscribers?: boolean;
}

interface UploadProgress {
  bytesUploaded: number;
  totalBytes: number;
  percentage: number;
}

export type UploadStatus =
  | { phase: 'idle' }
  | { phase: 'initiating' }
  | { phase: 'uploading'; progress: UploadProgress }
  | { phase: 'processing' }
  | { phase: 'thumbnail_uploading' }
  | { phase: 'complete'; videoId: string; videoUrl: string }
  | { phase: 'error'; error: string };

type OnProgressCallback = (status: UploadStatus) => void;

function buildSnippet(meta: UploadMetadata) {
  const maxDescLength = 5000;
  return {
    title: meta.title.substring(0, 100),
    description: meta.description.substring(0, maxDescLength),
    tags: (meta.tags || []).slice(0, 50).map((t) => t.substring(0, 30)),
    categoryId: meta.categoryId || '27',
  };
}

function buildStatus(meta: UploadMetadata) {
  return {
    privacyStatus: meta.privacyStatus || 'private',
    selfDeclaredMadeForKids: meta.madeForKids ? 'true' : 'false',
    notifySubscribers: meta.notifySubscribers !== false,
  };
}

async function initiateResumableUpload(
  accessToken: string,
  videoFile: File,
  meta: UploadMetadata,
): Promise<{ uploadUrl: string; videoId: string }> {
  const snippet = buildSnippet(meta);
  const statusBlock = buildStatus(meta);

  const initBody = JSON.stringify({
    snippet,
    status: statusBlock,
  });

  const initResp = await fetch(
    `${YOUTUBE_UPLOAD_URL}?uploadType=resumable&part=snippet,status`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Upload-Content-Length': videoFile.size.toString(),
        'X-Upload-Content-Type': videoFile.type || 'video/mp4',
      },
      body: initBody,
    },
  );

  if (!initResp.ok) {
    const errText = await initResp.text();
    let parsed: { error?: { message?: string } } = {};
    try {
      parsed = JSON.parse(errText);
    } catch {
      /* keep raw text */
    }
    throw new Error(
      parsed?.error?.message ||
        `YouTube a refusé l'upload (HTTP ${initResp.status}). Vérifiez vos quotas et le scope OAuth.`,
    );
  }

  const uploadUrl = initResp.headers.get('Location');
  if (!uploadUrl) {
    throw new Error(
      "YouTube n'a pas retourné d'URL d'upload. Token peut être invalide ou scope manquant.",
    );
  }

  const videoId = new URL(uploadUrl).searchParams.get('video_id') || 'unknown';

  return { uploadUrl, videoId };
}

async function uploadVideoChunks(
  uploadUrl: string,
  videoFile: File,
  onProgress?: OnProgressCallback,
): Promise<void> {
  const CHUNK_SIZE = 5 * 1024 * 1024;
  const totalSize = videoFile.size;
  let bytesUploaded = 0;

  if (videoFile.size <= CHUNK_SIZE) {
    if (onProgress) {
      onProgress({
        phase: 'uploading',
        progress: { bytesUploaded: 0, totalBytes: totalSize, percentage: 0 },
      });
    }

    const uploadResp = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': videoFile.type || 'video/mp4',
        'Content-Length': videoFile.size.toString(),
      },
      body: videoFile,
    });

    if (!uploadResp.ok) {
      const errText = await uploadResp.text();
      throw new Error(`Échec de l'upload du fichier : ${errText.substring(0, 300)}`);
    }

    if (onProgress) {
      onProgress({
        phase: 'uploading',
        progress: { bytesUploaded: totalSize, totalBytes: totalSize, percentage: 100 },
      });
    }
    return;
  }

  for (let start = 0; start < totalSize; start += CHUNK_SIZE) {
    const end = Math.min(start + CHUNK_SIZE, totalSize);
    const chunk = videoFile.slice(start, end);
    const chunkSize = end - start;

    const contentRange = `bytes ${start}-${end - 1}/${totalSize}`;

    const uploadResp = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': videoFile.type || 'video/mp4',
        'Content-Length': chunkSize.toString(),
        'Content-Range': contentRange,
      },
      body: chunk,
    });

    bytesUploaded = end;

    if (onProgress) {
      onProgress({
        phase: 'uploading',
        progress: {
          bytesUploaded,
          totalBytes: totalSize,
          percentage: Math.round((bytesUploaded / totalSize) * 100),
        },
      });
    }

    if (!uploadResp.ok) {
      if (uploadResp.status === 308) {
        continue;
      }
      const errText = await uploadResp.text();
      throw new Error(
        `Échec de l'upload au chunk ${start}-${end} : ${errText.substring(0, 300)}`,
      );
    }

    if (uploadResp.status === 200 || uploadResp.status === 201) {
      return;
    }
  }
}

async function uploadThumbnail(
  accessToken: string,
  videoId: string,
  thumbnailFile: File,
): Promise<void> {
  const formData = new FormData();
  formData.append('image', thumbnailFile);

  const resp = await fetch(
    `${YOUTUBE_THUMBNAIL_URL}?videoId=${videoId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    },
  );

  if (!resp.ok) {
    const errText = await resp.text();
    console.warn(
      `[YouTube Upload] La miniature n'a pas pu être envoyée : ${errText.substring(0, 200)}`,
    );
  }
}

async function waitForProcessing(
  accessToken: string,
  videoId: string,
  maxRetries = 10,
  delayMs = 3000,
): Promise<boolean> {
  for (let i = 0; i < maxRetries; i++) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));

    const resp = await fetch(
      `${YOUTUBE_API_BASE}/videos?part=status,processingDetails&id=${videoId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!resp.ok) continue;

    const data = await resp.json();
    const item = data.items?.[0];
    if (!item) continue;

    const processingStatus =
      item.processingDetails?.processingStatus || 'succeeded';

    if (
      processingStatus === 'succeeded' ||
      processingStatus === 'failed' ||
      processingStatus === 'terminated'
    ) {
      return processingStatus === 'succeeded';
    }
  }

  return false;
}

export async function uploadToYouTube(
  accessToken: string,
  videoFile: File,
  meta: UploadMetadata,
  onProgress?: OnProgressCallback,
): Promise<{ videoId: string; videoUrl: string }> {
  if (!accessToken) {
    throw new Error(
      "Aucun access token fourni. Connectez-vous d'abord via OAuth YouTube.",
    );
  }

  if (!videoFile || videoFile.size === 0) {
    throw new Error('Fichier vidéo vide ou invalide.');
  }

  if (!meta.title || meta.title.trim().length === 0) {
    throw new Error('Le titre de la vidéo est requis.');
  }

  if (onProgress) {
    onProgress({ phase: 'initiating' });
  }

  const { uploadUrl, videoId } = await initiateResumableUpload(
    accessToken,
    videoFile,
    meta,
  );

  await uploadVideoChunks(uploadUrl, videoFile, onProgress);

  if (onProgress) {
    onProgress({ phase: 'processing' });
  }

  await waitForProcessing(accessToken, videoId);

  if (meta.thumbnail) {
    if (onProgress) {
      onProgress({ phase: 'thumbnail_uploading' });
    }
    await uploadThumbnail(accessToken, videoId, meta.thumbnail);
  }

  const videoUrl = `https://youtube.com/watch?v=${videoId}`;

  if (onProgress) {
    onProgress({ phase: 'complete', videoId, videoUrl });
  }

  return { videoId, videoUrl };
}




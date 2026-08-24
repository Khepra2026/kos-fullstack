import { useState, useRef, useCallback } from 'react';

interface VideoAssemblerProps {
  audioBase64: string | null;
  thumbnailUrl: string | null;
  title: string;
  onComplete: (videoBlob: Blob, videoUrl: string) => void;
  onProgress: (status: string, percent: number) => void;
}

export default function VideoAssembler({ audioBase64, thumbnailUrl, title, onComplete, onProgress }: VideoAssemblerProps) {
  const [assembling, setAssembling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const assembleVideo = useCallback(async () => {
    if (!audioBase64 || !thumbnailUrl) {
      setError('Audio et miniature requis pour assembler la vidéo.');
      return;
    }

    setAssembling(true);
    setError(null);
    onProgress('Initialisation du rendu...', 5);

    try {
      // Step 1: Load the thumbnail image
      onProgress('Chargement de la miniature...', 10);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Impossible de charger la miniature.'));
        img.src = thumbnailUrl;
      });

      // Step 2: Setup canvas at 1280x720 (YouTube HD)
      onProgress('Préparation du canvas vidéo...', 20);
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas non disponible.');

      const WIDTH = 1280;
      const HEIGHT = 720;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Contexte canvas indisponible.');

      // Draw the thumbnail image (cover fit)
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = WIDTH / HEIGHT;

      let drawW: number, drawH: number, drawX: number, drawY: number;
      if (imgAspect > canvasAspect) {
        drawH = HEIGHT;
        drawW = HEIGHT * imgAspect;
        drawX = (WIDTH - drawW) / 2;
        drawY = 0;
      } else {
        drawW = WIDTH;
        drawH = WIDTH / imgAspect;
        drawX = 0;
        drawY = (HEIGHT - drawH) / 2;
      }

      // Dark overlay for branding area
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // Semi-transparent overlay for text readability
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Title text overlay
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 36px "Inter", "Helvetica Neue", sans-serif';
      ctx.textAlign = 'center';
      const words = title.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        if (ctx.measureText(testLine).width > WIDTH - 120) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      const lineHeight = 48;
      const totalTextHeight = lines.length * lineHeight;
      const startY = HEIGHT / 2 - totalTextHeight / 2 + 20;

      lines.forEach((line, i) => {
        // Text shadow for readability
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fillText(line, WIDTH / 2, startY + i * lineHeight);
      });

      // Bottom branding
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '500 16px "Inter", "Helvetica Neue", sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('KHEPRA EXPERTS', WIDTH - 40, HEIGHT - 30);

      // Step 3: Create audio element from base64
      onProgress('Préparation de l\'audio...', 40);
      const audioDataUri = `data:audio/mpeg;base64,${audioBase64}`;

      const audio = new Audio(audioDataUri);
      await new Promise<void>((resolve, reject) => {
        audio.addEventListener('loadedmetadata', () => resolve());
        audio.addEventListener('error', () => reject(new Error('Impossible de charger l\'audio.')));
        audio.load();
      });

      const duration = audio.duration;
      if (!duration || duration <= 0) throw new Error('Durée audio invalide.');

      // Step 4: Setup MediaRecorder with canvas stream + audio
      onProgress('Configuration de l\'encodeur vidéo...', 55);

      const canvasStream = canvas.captureStream(30); // 30 FPS
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaElementSource(audio);
      const dest = audioCtx.createMediaStreamDestination();
      source.connect(dest);
      source.connect(audioCtx.destination); // Also play for monitoring

      // Combine video + audio tracks
      const videoTrack = canvasStream.getVideoTracks()[0];
      const audioTrack = dest.stream.getAudioTracks()[0];
      const combinedStream = new MediaStream();
      if (videoTrack) combinedStream.addTrack(videoTrack);
      if (audioTrack) combinedStream.addTrack(audioTrack);

      // Determine best codec
      let mimeType = 'video/webm;codecs=vp8,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm;codecs=vp8';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
          mimeType = 'video/webm';
        }
      }

      const chunks: Blob[] = [];
      const recorder = new MediaRecorder(combinedStream, { mimeType, videoBitsPerSecond: 2500000 });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setOutputUrl(url);
        onComplete(blob, url);
        onProgress('Vidéo prête !', 100);
        audioCtx.close();
      };

      // Step 5: Start recording and play audio
      onProgress('Rendu vidéo en cours...', 70);

      recorder.start(1000); // Collect data every second
      await audio.play();

      // Update progress during playback
      const startTime = Date.now();
      const totalMs = duration * 1000;
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const pct = Math.min(95, 70 + (elapsed / totalMs) * 25);
        onProgress(`Rendu... ${Math.round(elapsed / 1000)}s / ${Math.round(duration)}s`, Math.round(pct));
      }, 500);

      // Wait for audio to finish
      await new Promise<void>((resolve) => {
        audio.addEventListener('ended', () => {
          clearInterval(progressInterval);
          resolve();
        });
      });

      recorder.stop();
      setAssembling(false);

    } catch (err) {
      setAssembling(false);
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'assemblage vidéo.');
      onProgress('Erreur', 0);
    }
  }, [audioBase64, thumbnailUrl, title, onComplete, onProgress]);

  return (
    <div className="rounded-2xl bg-white border border-background-200 overflow-hidden">
      <div className="p-5 border-b border-background-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF0000]/10 flex items-center justify-center">
            <i className="ri-movie-line text-[#FF0000] text-lg"></i>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground-950">Assembleur Vidéo Client-Side</h3>
            <p className="text-xs text-foreground-500">Audio + Miniature → Vidéo MP4 (WebM) prête pour YouTube</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Canvas (hidden) */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Status area */}
        {!audioBase64 && !thumbnailUrl && (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
              <i className="ri-information-line text-2xl text-amber-500"></i>
            </div>
            <p className="text-sm text-foreground-500">
              Générez d'abord l'audio (Voix IA) et la miniature pour activer l'assemblage vidéo.
            </p>
          </div>
        )}

        {(!audioBase64 || !thumbnailUrl) && (audioBase64 || thumbnailUrl) && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 mb-4">
            <p className="text-xs text-amber-700 flex items-center gap-2">
              <i className="ri-information-line"></i>
              {!audioBase64 ? 'Audio manquant — générez la voix d\'abord.' : 'Miniature manquante — générez la miniature d\'abord.'}
            </p>
          </div>
        )}

        {audioBase64 && thumbnailUrl && !outputUrl && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <i className="ri-check-line text-emerald-500"></i>
              <span className="text-xs font-semibold text-emerald-700">Tous les assets sont prêts pour l'assemblage</span>
            </div>

            <button
              onClick={assembleVideo}
              disabled={assembling}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#FF0000] text-white font-bold text-sm hover:bg-[#CC0000] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {assembling ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Assemblage en cours...
                </>
              ) : (
                <>
                  <i className="ri-movie-line"></i>
                  Assembler la vidéo
                </>
              )}
            </button>
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200">
            <p className="text-xs text-red-600 flex items-start gap-2">
              <i className="ri-error-warning-line flex-shrink-0"></i>
              {error}
            </p>
          </div>
        )}

        {outputUrl && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <i className="ri-checkbox-circle-fill text-emerald-500 text-lg"></i>
              <span className="text-sm font-bold text-emerald-700">Vidéo assemblée avec succès !</span>
            </div>

            {/* Video preview */}
            <div className="rounded-xl overflow-hidden bg-black">
              <video
                src={outputUrl}
                controls
                className="w-full"
                style={{ maxHeight: '360px' }}
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            </div>

            <a
              href={outputUrl}
              download={`${title.substring(0, 40).replace(/[^a-zA-Z0-9]/g, '_')}.webm`}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-download-line"></i>
              Télécharger la vidéo (WebM)
            </a>

            <p className="text-[10px] text-foreground-400 text-center">
              Format WebM compatible YouTube. Vous pouvez l'uploader directement sur YouTube Studio.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}




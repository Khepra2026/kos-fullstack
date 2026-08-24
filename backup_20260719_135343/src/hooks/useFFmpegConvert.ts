import { useState, useCallback, useRef } from 'react';

type ConversionStatus = 'idle' | 'loading' | 'converting' | 'completed' | 'failed';

interface ConversionState {
  status: ConversionStatus;
  progress: number; // 0-100
  message: string;
  outputUrl: string | null;
  error: string | null;
}

/**
 * Hook de conversion vidéo WebM → MP4 h264 via ffmpeg.wasm.
 *
 * ATTENTION: ffmpeg.wasm est lourd (~31MB pour le core WASM) et la conversion
 * est lente côté navigateur. Une vidéo de 40s en 1080p peut prendre 3-5 minutes.
 *
 * Le chargement du core WASM se fait lazy — uniquement quand l'utilisateur
 * lance une conversion. Le core est chargé depuis le CDN unpkg officiel.
 */
export function useFFmpegConvert() {
  const [state, setState] = useState<ConversionState>({
    status: 'idle',
    progress: 0,
    message: '',
    outputUrl: null,
    error: null,
  });

  const abortRef = useRef(false);
  const ffmpegRef = useRef<any>(null);
  const loadedRef = useRef(false);

  /**
   * Charge ffmpeg.wasm une seule fois (lazy).
   */
  const loadFFmpeg = useCallback(async () => {
    if (loadedRef.current && ffmpegRef.current) return ffmpegRef.current;

    setState({
      status: 'loading',
      progress: 0,
      message: 'Chargement de ffmpeg.wasm (~31MB)...',
      outputUrl: null,
      error: null,
    });

    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg');
      const { toBlobURL } = await import('@ffmpeg/util');

      const ffmpeg = new FFmpeg();

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

      ffmpeg.on('progress', ({ progress }: { progress: number }) => {
        setState((s) => ({
          ...s,
          progress: Math.round(progress * 100),
          message: `Conversion MP4... ${Math.round(progress * 100)}%`,
        }));
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      ffmpegRef.current = ffmpeg;
      loadedRef.current = true;

      setState({
        status: 'idle',
        progress: 0,
        message: 'ffmpeg.wasm chargé — prêt à convertir',
        outputUrl: null,
        error: null,
      });

      return ffmpeg;
    } catch (err: any) {
      setState({
        status: 'failed',
        progress: 0,
        message: '',
        outputUrl: null,
        error: `Échec chargement ffmpeg: ${err?.message || 'Erreur inconnue'}`,
      });
      return null;
    }
  }, []);

  /**
   * Convertit un blob WebM en MP4 h264.
   * @param webmBlob - Le blob vidéo WebM à convertir
   * @param filename - Nom de base pour le fichier de sortie
   */
  const convertToMP4 = useCallback(
    async (webmBlob: Blob, filename: string = 'render'): Promise<Blob | null> => {
      abortRef.current = false;

      setState({
        status: 'converting',
        progress: 0,
        message: 'Conversion WebM → MP4 h264 en cours...',
        outputUrl: null,
        error: null,
      });

      try {
        const ffmpeg = await loadFFmpeg();
        if (!ffmpeg) return null;

        const { fetchFile } = await import('@ffmpeg/util');

        // Écrire le fichier source
        await ffmpeg.writeFile('input.webm', await fetchFile(webmBlob));

        if (abortRef.current) throw new Error('Conversion annulée');

        // Conversion WebM → MP4 avec codec h264
        await ffmpeg.exec([
          '-i', 'input.webm',
          '-c:v', 'libx264',
          '-preset', 'fast',
          '-crf', '23',
          '-c:a', 'aac',
          '-b:a', '128k',
          '-movflags', '+faststart',
          '-pix_fmt', 'yuv420p',
          'output.mp4',
        ]);

        if (abortRef.current) throw new Error('Conversion annulée');

        // Lire le fichier de sortie
        const data = await ffmpeg.readFile('output.mp4');
        const mp4Blob = new Blob([data], { type: 'video/mp4' });

        // Nettoyer les fichiers temporaires
        try {
          await ffmpeg.deleteFile('input.webm');
          await ffmpeg.deleteFile('output.mp4');
        } catch { /* ignore cleanup errors */ }

        const url = URL.createObjectURL(mp4Blob);

        setState({
          status: 'completed',
          progress: 100,
          message: 'Conversion MP4 terminée !',
          outputUrl: url,
          error: null,
        });

        return mp4Blob;
      } catch (err: any) {
        if (abortRef.current) {
          setState({
            status: 'idle',
            progress: 0,
            message: 'Conversion annulée',
            outputUrl: null,
            error: null,
          });
          return null;
        }

        setState({
          status: 'failed',
          progress: 0,
          message: '',
          outputUrl: null,
          error: `Échec conversion: ${err?.message || 'Erreur inconnue'}`,
        });
        return null;
      }
    },
    [loadFFmpeg],
  );

  const cancelConversion = useCallback(() => {
    abortRef.current = true;
    setState((s) => ({
      ...s,
      status: 'idle',
      message: 'Conversion annulée',
      error: null,
    }));
  }, []);

  return { conversion: state, convertToMP4, loadFFmpeg, cancelConversion };
}




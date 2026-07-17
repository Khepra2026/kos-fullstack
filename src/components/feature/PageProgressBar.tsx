import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface PageProgressBarProps {
  color?: string;
  height?: number;
}

export function PageProgressBar({ color = '#86BC25', height = 3 }: PageProgressBarProps) {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef(0);

  const clearTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const startProgress = () => {
    clearTimers();
    progressRef.current = 0;
    setProgress(0);
    setVisible(true);

    // Montée rapide jusqu'à ~80% puis ralentit
    intervalRef.current = setInterval(() => {
      progressRef.current += progressRef.current < 60
        ? Math.random() * 8 + 4
        : progressRef.current < 80
        ? Math.random() * 3 + 1
        : 0.5;

      if (progressRef.current >= 90) {
        progressRef.current = 90;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      setProgress(progressRef.current);
    }, 80);
  };

  const completeProgress = () => {
    clearTimers();
    progressRef.current = 100;
    setProgress(100);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
      progressRef.current = 0;
    }, 400);
  };

  useEffect(() => {
    startProgress();
    // Laisser le temps à la page de se rendre
    timerRef.current = setTimeout(() => {
      completeProgress();
    }, 600);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Chargement de la page"
    >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: `linear-gradient(90deg, ${color} 0%, #e8c04a 60%, #f5d76e 100%)`,
          boxShadow: `0 0 8px ${color}80, 0 0 2px ${color}40`,
          transition: progress === 100
            ? 'width 0.2s ease-out, opacity 0.3s ease'
            : 'width 0.08s linear',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}

interface ReadingProgressBarProps {
  progress: number;
}

export function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gray-200/60"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-600 transition-all duration-150 ease-out shadow-sm"
        style={{ width: `${progress}%`, pointerEvents: 'none' }}
      />
    </div>
  );
}





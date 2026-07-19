import { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: 'fadeSlideUp' | 'fadeSlideLeft' | 'fadeSlideRight' | 'fadeIn' | 'scale';
}

const ANIMATION_HIDDEN: Record<string, string> = {
  fadeSlideUp: 'opacity-0 translate-y-8',
  fadeSlideLeft: 'opacity-0 -translate-x-6',
  fadeSlideRight: 'opacity-0 translate-x-6',
  fadeIn: 'opacity-0',
  scale: 'opacity-0 scale-95',
};

const ANIMATION_VISIBLE: Record<string, string> = {
  fadeSlideUp: 'opacity-100 translate-y-0',
  fadeSlideLeft: 'opacity-100 translate-x-0',
  fadeSlideRight: 'opacity-100 translate-x-0',
  fadeIn: 'opacity-100',
  scale: 'opacity-100 scale-100',
};

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  animation = 'fadeSlideUp',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.05, rootMargin: '80px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  const hiddenClass = ANIMATION_HIDDEN[animation] ?? ANIMATION_HIDDEN.fadeSlideUp;
  const visibleClass = ANIMATION_VISIBLE[animation] ?? ANIMATION_VISIBLE.fadeSlideUp;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? visibleClass : hiddenClass} ${className}`}
    >
      {children}
    </div>
  );
}




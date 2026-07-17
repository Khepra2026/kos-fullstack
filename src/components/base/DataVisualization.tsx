import { useState, useEffect, useRef } from 'react';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface DataVisualizationProps {
  data: DataPoint[];
  type: 'bar' | 'progress' | 'donut';
  title?: string;
  subtitle?: string;
  height?: number;
  showValues?: boolean;
  className?: string;
}

export function DataVisualization({
  data,
  type,
  title,
  subtitle,
  height = 300,
  showValues = true,
  className = ''
}: DataVisualizationProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#86BC25', '#a8652e', '#e8c04a', '#8a4e22', '#cc8a4e', '#6B9B1F'];
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver pour animer au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const renderBar = () => (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        const color = item.color || colors[index % colors.length];
        
        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-navy-700">{item.label}</span>
              {showValues && (
                <span className="font-semibold text-navy-900">{item.value}</span>
              )}
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: isVisible ? `${percentage}%` : '0%',
                  background: `linear-gradient(90deg, ${color}, ${color}dd)`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderProgress = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {data.map((item, index) => {
        const color = item.color || colors[index % colors.length];
        const circumference = 2 * Math.PI * 45;
        const offset = isVisible ? circumference - (item.value / 100) * circumference : circumference;

        return (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-32 h-32 will-change-transform">
              <svg className="transform -rotate-90 w-32 h-32" viewBox="0 0 128 128" shapeRendering="geometricPrecision">
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  stroke="#f0f0f0"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="45"
                  stroke={color}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  shapeRendering="geometricPrecision"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-navy-900">{item.value}%</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <div className="font-semibold text-navy-700">{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderDonut = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="relative w-64 h-64 will-change-transform">
          <svg viewBox="0 0 200 200" className="w-full h-full" shapeRendering="geometricPrecision">
            {data.map((item, index) => {
              const color = item.color || colors[index % colors.length];
              const percentage = (item.value / total) * 100;
              const radius = 80;
              const circumference = 2 * Math.PI * radius;
              const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
              const strokeDashoffset = isVisible ? 0 : circumference;
              const rotation = (cumulativePercentage / 100) * 360 - 90;
              
              const segment = (
                <circle
                  key={index}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth="30"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transformOrigin: '100px 100px'
                  }}
                  className="transition-all duration-1000 ease-out"
                  shapeRendering="geometricPrecision"
                />
              );
              
              cumulativePercentage += percentage;
              return segment;
            })}
            <circle cx="100" cy="100" r="55" fill="white" shapeRendering="geometricPrecision" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-navy-900">{total}</div>
            <div className="text-sm text-navy-600">Total</div>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => {
            const color = item.color || colors[index % colors.length];
            const percentage = ((item.value / total) * 100).toFixed(1);
            
            return (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <div className="font-medium text-navy-700">{item.label}</div>
                  <div className="text-sm text-navy-500">{percentage}%</div>
                </div>
                {showValues && (
                  <div className="font-semibold text-navy-900">{item.value}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className={`bg-white rounded-xl border border-gold-100 p-6 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h3 className="text-xl font-semibold text-navy-900 mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-navy-600">{subtitle}</p>
          )}
        </div>
      )}

      <div style={{ minHeight: `${height}px` }} className="flex items-center">
        {type === 'bar' && renderBar()}
        {type === 'progress' && renderProgress()}
        {type === 'donut' && renderDonut()}
      </div>
    </div>
  );
}
interface SkeletonLoaderProps {
  type?: 'text' | 'card' | 'avatar' | 'image';
  count?: number;
  className?: string;
}

export function SkeletonLoader({ 
  type = 'text', 
  count = 1,
  className = '' 
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return (
          <div className={`h-4 bg-gray-200 rounded shimmer ${className}`} />
        );
      case 'card':
        return (
          <div className={`bg-white rounded-lg border border-gray-100 p-6 ${className}`}>
            <div className="h-6 bg-gray-200 rounded shimmer mb-4 w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded shimmer" />
              <div className="h-4 bg-gray-200 rounded shimmer w-5/6" />
              <div className="h-4 bg-gray-200 rounded shimmer w-4/6" />
            </div>
          </div>
        );
      case 'avatar':
        return (
          <div className={`w-12 h-12 bg-gray-200 rounded-full shimmer ${className}`} />
        );
      case 'image':
        return (
          <div className={`w-full h-48 bg-gray-200 rounded-lg shimmer ${className}`} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
}




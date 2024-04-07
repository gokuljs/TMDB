import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkeletonLoader = () => {
  return (
    <div className="w-full h-full py-3 overflow-auto grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-6 justify-items-center mx-auto">
      {Array.from({ length: 10 }, (_, index) => (
        <Skeleton key={index} className="w-[193px] h-[400px] rounded-lg" data-testid="skeleton" />
      ))}
    </div>
  );
};

export default SkeletonLoader;

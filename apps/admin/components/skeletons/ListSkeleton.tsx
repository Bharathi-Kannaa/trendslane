import { Skeleton } from '@workspace/ui/components/skeleton';
import React from 'react';

const ListSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length }).map((_, index) => (
        <Skeleton key={index} className='w-40 h-4' />
      ))}
    </div>
  );
};

export default ListSkeleton;

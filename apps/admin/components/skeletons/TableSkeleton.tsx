import { Skeleton } from '@workspace/ui/components/skeleton';
import React from 'react';

const TableSkeleton = ({
  columnsCount = 5,
  rowsCount = 12,
}: {
  columnsCount?: number;
  rowsCount?: number;
}) => {
  return (
    <div className='mt-30 rounded-md border overflow-hidden flex items-center justify-center'>
      <table className='w-full'>
        <thead>
          <tr>
            {Array.from({ length: columnsCount }).map((_, i) => (
              <th key={i} className='p-2'>
                <Skeleton className='h-4 w-24 ' />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rowsCount }).map((_, r) => (
            <tr key={r} className='border-t'>
              {Array.from({ length: columnsCount }).map((_, c) => (
                <td key={c} className='p-2'>
                  <Skeleton className='h-4 w-full ' />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;

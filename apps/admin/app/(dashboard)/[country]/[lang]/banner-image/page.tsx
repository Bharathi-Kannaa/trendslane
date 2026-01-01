import React, { Suspense } from 'react';
import BannerImageFetch from './banner-image-fetch';
import { Country, getFullCountryName, Language } from '@workspace/types';
import TableSkeleton from '@/components/skeletons/TableSkeleton';

const BannerImage = async ({
  params,
}: {
  params: Promise<{ country: Country; lang: Language }>;
}) => {
  const { country, lang } = await params;
  return (
    <main>
      <div className='mb-8 px-4 py-2 rounded-md'>
        <h1 className='font-semibold'>{getFullCountryName(country)} - Banner Image</h1>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <BannerImageFetch country={country} lang={lang} />
      </Suspense>
    </main>
  );
};

export default BannerImage;

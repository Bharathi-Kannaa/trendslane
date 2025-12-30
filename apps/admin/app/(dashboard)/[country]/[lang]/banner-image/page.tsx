import React, { Suspense } from 'react';
import BannerImageFetch from './BannerImageFetch';
import { Country, Language } from '@workspace/types';

const BannerImage = async ({
  params,
}: {
  params: Promise<{ country: Country; lang: Language }>;
}) => {
  const { country, lang } = await params;
  return (
    <main>
      <Suspense fallback={<div className='h-screen'> Loading.... </div>}>
        <BannerImageFetch country={country} lang={lang} />
      </Suspense>
    </main>
  );
};

export default BannerImage;

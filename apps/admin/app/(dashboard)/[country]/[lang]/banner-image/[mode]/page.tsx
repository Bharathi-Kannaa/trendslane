import { Country, Language } from '@workspace/types';
import React from 'react';
import BannerImageForm from '../BannerImageForm';

const page = async ({
  params,
}: {
  params: Promise<{ country: Country; lang: Language; mode: 'create' | 'edit' }>;
}) => {
  const { mode, lang } = await params;
  return (
    <div className='p-1 mt-2 md:p-8'>
      <BannerImageForm mode={mode} lang={lang} />
    </div>
  );
};

export default page;

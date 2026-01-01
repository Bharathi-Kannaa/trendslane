import React from 'react';
import BannerImageForm from '../../BannerImageForm';

const page = async ({
  params,
}: {
  params: Promise<{ country: string; lang: string; mode: 'create' | 'edit'; id: string }>;
}) => {
  const { mode, id } = await params;

  console.log(mode, id);

  return (
    <div className='p-1 mt-2 md:p-8'>
      <BannerImageForm mode={mode} />
    </div>
  );
};

export default page;

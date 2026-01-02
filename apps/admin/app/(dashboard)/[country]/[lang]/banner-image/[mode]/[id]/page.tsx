'use client';
import React from 'react';
import BannerImageForm from '../../BannerImageForm';
import { Id } from '@workspace/backend/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { useParams } from 'next/navigation';
import { Language } from '@workspace/types';

const EditBannerImagePage = () => {
  const { id, lang } = useParams();
  const getBannerImageById = useQuery(api.functions.bannerImage.getBannerTranslationById, {
    bannerId: id as Id<'bannerImages'>,
    lang: lang as Language,
  });

  // const { user } = useUser();

  if (!getBannerImageById) return null;

  // if (getBannerImageById.userId !== user?.id) {
  //   redirect('/');
  // }

  return (
    <div className='p-1 mt-2 md:p-8'>
      <BannerImageForm mode={'edit'} lang={lang as Language} initialData={getBannerImageById} />
    </div>
  );
};

export default EditBannerImagePage;

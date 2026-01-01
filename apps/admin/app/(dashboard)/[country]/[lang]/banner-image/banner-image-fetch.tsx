import React from 'react';
import { Country, Language } from '@workspace/types';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@workspace/backend/convex/_generated/api';
import { BannerImageClient } from './banner-image-client';

const getBannerImageData = async (country: Country, lang: Language) => {
  const response = await fetchQuery(api.functions.bannerImage.getBannerImages, { country, lang });
  return response;
};

const BannerImageFetch = async ({ country, lang }: { country: Country; lang: Language }) => {
  const data = await getBannerImageData(country, lang);

  return <BannerImageClient country={country} lang={lang} bannerImageData={data} />;
};

export default BannerImageFetch;

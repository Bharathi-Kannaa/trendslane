import React from 'react';
import { Country, Language } from '@workspace/types';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@workspace/backend/convex/_generated/api';

const getBannerImageData = async (country: Country, lang: Language) => {
  const response = await fetchQuery(api.functions.bannerImage.getBannerImages, { country, lang });
  console.log(response, 'Response');
  return response;
};

const BannerImageFetch = async ({ country, lang }: { country: Country; lang: Language }) => {
  await getBannerImageData(country, lang);

  return <div>BannerImageFetch</div>;
};

export default BannerImageFetch;

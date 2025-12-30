'use client';

import { useQuery } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { Country, Language } from '@workspace/types';

export function BannerImageClient({ country, lang }: { country: Country; lang: Language }) {
  const bannerImage = useQuery(api.functions.bannerImage.getBannerImages, { country, lang });
  console.log(bannerImage);
  if (!bannerImage) return null;

  console.log(bannerImage, 'bannerImage');
  return <></>;
}

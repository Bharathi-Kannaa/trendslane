'use client';

import { useQuery } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { Country, Language } from '@workspace/types';
import { FunctionReturnType } from 'convex/server';
import { notFound } from 'next/navigation';
import { BannerImageDataTable } from '@/components/tables/banner-image-table/data-table';
import { columns } from '@/components/tables/banner-image-table/columns';

export type BannerImageArray = FunctionReturnType<typeof api.functions.bannerImage.getBannerImages>;
export type BannerImageData = BannerImageArray[number];

export type BannerImage = BannerImageArray[number];
export function BannerImageClient({
  country,
  lang,
  bannerImageData,
}: {
  country: Country;
  lang: Language;
  bannerImageData: BannerImageArray;
}) {
  const bannerImage = useQuery(api.functions.bannerImage.getBannerImages, { country, lang });

  const data = bannerImage ?? bannerImageData;

  if (!data) return notFound();

  return <BannerImageDataTable columns={columns} data={data} />;
}

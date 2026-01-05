'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import FadeContent from '../FadeContent/fade-content';
import { Button } from '@workspace/ui/components/button';
import { useQuery } from 'convex/react';
import { api } from '@workspace/backend/convex/_generated/api';
import { Country, Language } from '@workspace/types';

const BannerImage = ({ country, lang }: { country: Country; lang: Language }) => {
  const data =
    useQuery(api.functions.bannerImage.getBannerImages, {
      country,
      lang,
    }) ?? [];

  const [activeImage, setActiveImage] = useState(0);

  console.log(data, 'Data');

  return (
    <div className='relative w-full h-[calc(100vh-56px)] overflow-hidden'>
      {/* Banner Image */}
      <Image
        key={data[activeImage]?._id}
        className='absolute top-0 left-0 object-cover transition-opacity duration-500'
        fill
        src={
          data?.[activeImage]?.imageUrl ||
          'https://wallpapers.com/images/featured/plain-black-background-02fh7564l8qq4m6d.jpg'
        }
        alt={data?.[activeImage]?.audience || data[activeImage]?.title || 'Banner Image'}
      />

      {/* Overlay Content */}
      <div className='z-10 absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center max-w-full pl-8 pr-8'>
        <FadeContent
          className='flex flex-col gap-4'
          blur={true}
          duration={1000}
          easing='ease-out'
          initialOpacity={0}
        >
          <h2 className='text-3xl md:text-6xl lg-text-8xl xl:text-7xl  whitespace-nowrap text-center flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <span>Designed in</span>
              <span className='italic'>Barcelona</span>
            </div>
            <span className=''>since 1964</span>
          </h2>
          <div className='flex items-center justify-center'>
            <div className='flex items-center gap-5 '>
              {data.map((item, index) => (
                <Button
                  asChild
                  key={item._id}
                  tabIndex={-1}
                  variant='link'
                  className='text-white uppercase'
                  onMouseEnter={() => setActiveImage(index)}
                >
                  <Link href={`/h/${item.audience}`}>{item.translatedAudience}</Link>
                </Button>
              ))}
            </div>
          </div>
        </FadeContent>
      </div>
    </div>
  );
};

export default BannerImage;

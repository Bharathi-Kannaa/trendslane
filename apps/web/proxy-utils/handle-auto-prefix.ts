import { allowedCountries, autoPrefixSections } from '@workspace/types';
import { NextRequest, NextResponse } from 'next/server';

export const handleAutoPrefix = (req: NextRequest, segments: string[]) => {
  const firstSegment = segments[0];

  const isNotAllowedCountry =
    !firstSegment || !allowedCountries.includes(firstSegment as (typeof allowedCountries)[number]);

  const isAutoPrefixSection = autoPrefixSections.includes(firstSegment!);

  if (!isNotAllowedCountry || !isAutoPrefixSection) return null;

  const cookieCountry = req.cookies.get('web.country')?.value;
  const cookieLang = req.cookies.get('web.lang')?.value;
  const url = req.nextUrl.clone();
  url.pathname = `/${cookieCountry}/${cookieLang}/${segments.join('/')}`;

  return NextResponse.redirect(url);
};

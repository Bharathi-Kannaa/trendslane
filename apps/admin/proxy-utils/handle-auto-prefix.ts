import { allowedCountries, autoAdminPrefixSection } from '@workspace/types';
import { NextRequest, NextResponse } from 'next/server';

export const handleAutoPrefix = (req: NextRequest, segments: string[]) => {
  const firstSegment = segments[0];
  const isNotAllowedCountry =
    !firstSegment || !allowedCountries.includes(firstSegment as (typeof allowedCountries)[number]);
  const isAutoPrefixSection = autoAdminPrefixSection.includes(firstSegment!);

  if (!isNotAllowedCountry || !isAutoPrefixSection) return null;

  const cookieCountry = req.cookies.get('admin.country')?.value;
  const cookieLang = req.cookies.get('admin.lang')?.value;

  const url = req.nextUrl.clone();
  url.pathname = `/${cookieCountry}/${cookieLang}/${segments.join('/')}`;

  return NextResponse.redirect(url);
};

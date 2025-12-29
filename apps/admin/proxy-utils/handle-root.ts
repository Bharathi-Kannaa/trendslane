import { NextRequest, NextResponse } from 'next/server';
import { setCountryAndLangCookies } from './set-cookies';
import { languages, allowedCountries, Language } from '@workspace/types';

export const handleRoot = (req: NextRequest) => {
  // Take from cookie if available else go and detect the country from headers
  // FOR LOCAL DEFAULTED TO 'in'(India)
  const cookieCountry = req.cookies.get('admin.country')?.value;
  const cookieLang = req.cookies.get('admin.lang')?.value;
  const cookieBrand = req.cookies.get('admin.brandId')?.value;

  if (
    cookieCountry &&
    cookieLang &&
    allowedCountries.includes(cookieCountry) &&
    languages.includes(cookieLang)
  ) {
    const url = req.nextUrl.clone();

    url.pathname = cookieBrand
      ? `/${cookieCountry}/${cookieLang}/h/${cookieBrand}`
      : `/${cookieCountry}/${cookieLang}`;

    return NextResponse.redirect(url);
  }

  // PROD
  let detectedCountry = req.headers.get('x-vercel-ip-country')?.toLowerCase() || 'in';

  if (!allowedCountries.includes(detectedCountry)) detectedCountry = 'in';

  const lang: Language = languages[0]!;

  const url = req.nextUrl.clone();
  url.pathname = `/${detectedCountry}/${lang}`;

  const res = NextResponse.redirect(url);
  setCountryAndLangCookies(res, detectedCountry, lang);
  return res;
};

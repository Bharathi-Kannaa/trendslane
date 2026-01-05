import { allowedCountries, allowedLanguages, Country, Language } from '@workspace/types';
import { NextRequest, NextResponse } from 'next/server';
import { setCountryAndLangCookies } from './set-cookies';

export const handleRoot = (req: NextRequest) => {
  // Take from cookie if available else go and detect the country from headers
  // FOR LOCAL DEFAULTED TO 'in'(India)
  console.log('handleRoot');
  const cookieCountry = req.cookies.get('web.country')?.value;
  const cookieLang = req.cookies.get('web.lang')?.value;
  const cookieBrand = req.cookies.get('web.brandId')?.value;

  if (
    cookieCountry &&
    cookieLang &&
    allowedCountries.includes(cookieCountry as Country) &&
    allowedLanguages.includes(cookieLang as Language)
  ) {
    const url = req.nextUrl.clone();

    url.pathname = cookieBrand
      ? `/${cookieCountry}/${cookieLang}/h/${cookieBrand}`
      : `/${cookieCountry}/${cookieLang}`;

    return NextResponse.redirect(url);
  }

  // PROD
  let detectedCountry = req.headers.get('x-vercel-ip-country')?.toLowerCase() || 'in';

  if (!allowedCountries.includes(detectedCountry as Country)) detectedCountry = 'in';

  const lang = allowedLanguages[0]!;

  const url = req.nextUrl.clone();
  url.pathname = `/${detectedCountry}/${lang}`;

  const res = NextResponse.redirect(url);
  setCountryAndLangCookies(res, detectedCountry, lang);
  return res;
};

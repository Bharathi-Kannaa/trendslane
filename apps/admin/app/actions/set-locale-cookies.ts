'use server';

import { redirect } from 'next/navigation';
import { getCookie, setCookie } from './cookie-helper';
import { Country, Language } from '@workspace/types';

export async function setLocaleCookies(country: Country, lang: Language, extendPath?: string) {
  setCookie('admin.country', country);
  setCookie('admin.lang', lang);
  const currentPath = await getCookie('admin.next.url');
  if (currentPath) {
    let segments = currentPath.split('/').filter(Boolean);

    segments[0] = country;
    segments[1] = lang;

    if (extendPath) {
      const extendSegments = extendPath.split('/').filter(Boolean);
      segments = [country, lang, ...extendSegments];
    }

    return redirect('/' + segments.join('/'));
  }

  redirect(`/${country}/${lang}`);
}

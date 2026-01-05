'use server';

import { redirect } from 'next/navigation';
import { getCookie, setCookie } from './cookie-helper';

export async function setLocaleCookies(country: string, lang: string, extendPath?: string) {
  setCookie('web.country', country);
  setCookie('web.lang', lang);

  console.log(extendPath, 'Extend path');
  const currentPath = await getCookie('web.next.url'); // set via middleware
  console.log(currentPath, 'Current path');

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

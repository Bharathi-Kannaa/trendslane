'use server';

import { redirect } from 'next/navigation';
import { getCookie, setCookie } from './cookie-helper';
import { Country, Language } from '@workspace/types';

export async function setLocaleCookies(country: Country, lang: Language, extendPath?: string) {
  console.log(country, lang, 'Checker');
  setCookie('admin.country', country);
  setCookie('admin.lang', lang);

  let path = `/${country}/${lang}`;

  const currentPath = await getCookie('admin.next.url');

  if (currentPath) {
    const segments = currentPath.split('/').filter(Boolean);
    const rest = segments.slice(2).join('/');
    path = `/${country}/${lang}${rest ? '/' + rest : ''}`;
  }

  if (extendPath) {
    const extendSegments = extendPath.split('/').filter(Boolean);
    path = `/${country}/${lang}/${extendSegments.join('/')}`;
  }

  redirect(path);
}

import { Language } from '@workspace/types';
import { NextResponse } from 'next/server';

export function cookieSettings() {
  return { path: '/', maxAge: 60 * 60 * 24 * 365 };
}

export function setCountryAndLangCookies(res: NextResponse, country: string, language: Language) {
  res.cookies.set('web.country', country, cookieSettings());
  res.cookies.set('web.lang', language, cookieSettings());
}

import { NextResponse } from 'next/server';

export function cookieSettings() {
  return { path: '/', maxAge: 60 * 60 * 24 * 365 };
}

export function setCountryAndLangCookies(res: NextResponse, country: string, language: string) {
  res.cookies.set('admin.country', country, cookieSettings());
  res.cookies.set('admin.lang', language, cookieSettings());
}

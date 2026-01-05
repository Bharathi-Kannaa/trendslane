import { Country, Language } from '@workspace/types';
import { NextRequest, NextResponse } from 'next/server';

export function handleBrandAutoForward(
  req: NextRequest,
  segments: string[],
  country: Country,
  language: Language,
) {
  if (segments.length !== 2) return null;

  const brand = req.cookies.get('brandId')?.value;
  if (!brand) return null;

  const url = req.nextUrl.clone();
  url.pathname = `/${country}/${language}/h/${brand}`;

  return NextResponse.redirect(url);
}

import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';
import { handleAutoPrefix } from './proxy-utils/handle-auto-prefix';
import { handleRoot } from './proxy-utils/handle-root';
import { isValidCountry, isValidLanguage } from './proxy-utils/region-validators';
import { handleBrandAutoForward } from './proxy-utils/handle-brand-auto-forward';
import { handleAudience } from './proxy-utils/handle-audience';
import { Country, Language } from '@workspace/types';

export default clerkMiddleware((auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Root
  if (pathname === '/') return handleRoot(req);

  const segments = pathname.split('/').filter(Boolean);

  // Auto prefix
  const autoPrefix = handleAutoPrefix(req, segments);
  if (autoPrefix) return autoPrefix;

  if (segments.length < 2) return handleRoot(req);

  const [country, lang] = segments;

  if (!isValidCountry(country) || !isValidLanguage(lang)) {
    return handleRoot(req);
  }

  // BRAND AUTO-FORWARD
  const brandRedirect = handleBrandAutoForward(req, segments, country as Country, lang as Language);
  if (brandRedirect) return brandRedirect;

  const response = NextResponse.next();

  const audience = handleAudience(req, response, segments);
  if (audience) return audience;

  const existing = req.cookies.get('web.next.url')?.value;
  if (existing !== req.nextUrl.pathname) {
    const response = NextResponse.next();
    response.cookies.set('web.next.url', req.nextUrl.pathname, { path: '/' });
    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpg|jpeg|png|gif|svg|webp|ico|woff2?|ttf|zip|csv|docx?|xlsx?)).*)',
    '/(api|trpc)(.*)',
  ],
};

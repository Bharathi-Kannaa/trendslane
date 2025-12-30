import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { handleRoot } from './proxy-utils/handle-root';
import { handleAutoPrefix } from './proxy-utils/handle-auto-prefix';
import { isValidCountry, isValidLanguage } from './proxy-utils/region-validators';
import { Country, CustomJWTSessionClaims, Role } from '@workspace/types';
import { authorized } from './proxy-utils/check-user-authorization';

const isPublicRoute = createRouteMatcher([
  '/:country/:lang/sign-in(.*)',
  '/:country/:lang/unauthorized(.*)',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  if (pathname === '/') return handleRoot(req);

  const segments = pathname.split('/').filter(Boolean);

  const autoPrefix = handleAutoPrefix(req, segments);
  if (autoPrefix) return autoPrefix;

  if (segments.length < 2) return handleRoot(req);

  const [country, lang] = segments;

  if (!isValidCountry(country) || !isValidLanguage(lang)) {
    return handleRoot(req);
  }

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const { userId, sessionClaims } = await auth();

  if (!userId) {
    const url = req.nextUrl.clone();
    url.pathname = `/${country}/${lang}/sign-in`;
    return NextResponse.redirect(url);
  }

  const role = (sessionClaims as CustomJWTSessionClaims)?.metadata?.role;
  const userAccessCountry = (sessionClaims as CustomJWTSessionClaims).metadata?.country;

  if (role !== 'admin' && role !== Role.SuperAdmin) {
    return NextResponse.redirect(new URL(`/${country}/${lang}/unauthorized`, req.url));
  }
  if (role === 'admin' && !authorized(role, country as Country, userAccessCountry)) {
    return NextResponse.redirect(new URL(`/${country}/${lang}/unauthorized`, req.url));
  }

  const existing = req.cookies.get('admin.next.url')?.value;

  if (existing !== req.nextUrl.pathname) {
    const response = NextResponse.next();
    response.cookies.set('admin.next.url', req.nextUrl.pathname, { path: '/' });
    return response;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

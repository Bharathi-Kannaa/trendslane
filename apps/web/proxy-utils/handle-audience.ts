import { NextResponse, NextRequest } from 'next/server';
import { handleRoot } from './handle-root';
import { allowedAudience, Audience } from '@workspace/types';

export function handleAudience(req: NextRequest, response: NextResponse, segments: string[]) {
  if (segments.length < 3 || segments[2] !== 'h') return null;
  if (segments.length < 4) return handleRoot(req);
  console.log('Entered handleAudience');

  const audience = segments[3]!;

  if (!allowedAudience.includes(audience as Audience)) {
    return handleRoot(req);
  }

  response.cookies.set('web.brandId', audience, {
    path: '/',
    httpOnly: false,
  });

  return response;
}

'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ReactNode } from 'react';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Convex URL is not defined in environment variables');
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}

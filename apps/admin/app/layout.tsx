import { Geist, Geist_Mono } from 'next/font/google';
import '@workspace/ui/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { ConvexClientProvider } from '@/components/providers/ConvexProvider';
import { Suspense } from 'react';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <ConvexClientProvider>
        <ClerkProvider>
          {/* <SyncUserWithConvex /> */}
          <html lang='en' suppressHydrationWarning>
            <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
              <ThemeProvider>{children}</ThemeProvider>
            </body>
          </html>
        </ClerkProvider>
      </ConvexClientProvider>
    </Suspense>
  );
}

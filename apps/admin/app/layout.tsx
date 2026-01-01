import { Geist, Geist_Mono } from 'next/font/google';
import '@workspace/ui/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from 'react';
import ProgressBarProvider from '@/components/providers/ProgressProvider';

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
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <ProgressBarProvider>
          <Suspense fallback={null}>
            <ClerkProvider>
              {/* <SyncUserWithConvex /> */}
              <ThemeProvider>{children}</ThemeProvider>
            </ClerkProvider>
          </Suspense>
        </ProgressBarProvider>
      </body>
    </html>
  );
}

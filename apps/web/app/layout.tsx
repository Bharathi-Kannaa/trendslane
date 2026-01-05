import { Geist, Geist_Mono } from 'next/font/google';

import '@workspace/ui/globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProviders';
import { ClerkProvider } from '@clerk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import { isRTL } from '@workspace/types';
import ProgressBarProvider from '@/components/providers/ProgressProvider';

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get('web.lang')?.value || 'en';

  return (
    <html lang='en' dir={isRTL(lang) ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <ThemeProvider>
          <ProgressBarProvider>
            <NextIntlClientProvider>
              <ClerkProvider>{children}</ClerkProvider>
            </NextIntlClientProvider>
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

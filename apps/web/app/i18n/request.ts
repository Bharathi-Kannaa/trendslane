import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get('web.lang')?.value || 'en';

  const safeLocale = locale as string;
  console.log(safeLocale, 'safeLocale');
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
  };
});

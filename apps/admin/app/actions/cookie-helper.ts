'use server';

import { cookies } from 'next/headers';

export async function getCookie(name: string) {
  return (await cookies()).get(name)?.value ?? null;
}

export async function setCookie(
  name: string,
  value: string,
  options?: { path?: string; domain?: string },
) {
  const store = await cookies();
  store.set(name, value, options);
}

export async function deleteCookie(name: string) {
  const store = await cookies();
  store.delete(name);
}

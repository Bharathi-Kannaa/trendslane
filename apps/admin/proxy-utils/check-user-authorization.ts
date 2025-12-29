import { setLocaleCookies } from '@/app/actions/set-locale-cookies';
import { Country, Role, UserRole } from '@workspace/types';

export const authorized = (role: UserRole, country: Country, userAccessCountry?: Country[]) => {
  if (role === 'admin' && userAccessCountry?.includes(country)) return true;

  return false;
};

export async function navigateIfAllowed(
  role: UserRole | undefined,
  country: Country,
  userAccessCountry: Country[] | undefined,
  path: string,
  lang = 'en',
) {
  if (!role || !country) return;

  if (
    role === Role.SuperAdmin ||
    (role === 'admin' && authorized(role, country, userAccessCountry))
  ) {
    await setLocaleCookies(country, lang, path);
  }
}

export function canNavigateToBannerImage(
  role: UserRole | undefined,
  country: Country,
  userAccessCountry: Country[] | undefined,
): boolean {
  if (!role) return false;
  if (role === Role.SuperAdmin) return true;

  if (role === 'admin' && authorized(role, country, userAccessCountry)) {
    return true;
  }

  return false;
}

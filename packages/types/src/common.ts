export const countries = ['in', 'fr', 'sa'];
export type Country = (typeof countries)[number];

export const allowedCountries = countries as Country[];

export const languages = ['en', 'fr', 'ar', 'ta'];
export type Language = (typeof languages)[number];
export const allowedLanguages = languages as Language[];

export const AUDIENCE_ORDER = ['women', 'men', 'teen', 'kids'];
export type Audience = (typeof AUDIENCE_ORDER)[number];

const COUNTRY_NAME_MAP: Record<Country, string> = {
  in: 'India',
  fr: 'France',
  sa: 'Saudi Arabia',
};

export function getFullCountryName(country?: string): string {
  if (!country) return '';

  return COUNTRY_NAME_MAP[country] ?? country;
}

export const countries = ['in', 'fr', 'ae'] as const;
export type Country = (typeof countries)[number];

export const allowedCountries: readonly Country[] = countries;

export const languages = ['en', 'fr', 'ar', 'ta'] as const;
export type Language = (typeof languages)[number];
export const allowedLanguages: readonly Language[] = languages;

export const AUDIENCE_ORDER = ['women', 'men', 'teen', 'kids'] as const;
export type Audience = (typeof AUDIENCE_ORDER)[number];

const COUNTRY_NAME_MAP: Record<Country, string> = {
  in: 'India',
  fr: 'France',
  ae: 'United Arab Emirates',
};

export function getFullCountryName(country?: Country): string {
  if (!country) return '';

  return COUNTRY_NAME_MAP[country] ?? country;
}

export const mapLanguageToCountry = (country: Country): Language => {
  console.log(country, 'Mapping country to lang');
  if (!country) return 'en';

  switch (country) {
    case 'in':
      return 'en';
    case 'fr':
      return 'fr';
    case 'ae':
      return 'ar';
    default:
      return 'en';
  }
};

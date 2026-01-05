import { allowedCountries, allowedLanguages, Country, Language } from '@workspace/types';

export const isValidCountry = (country: string | undefined) => {
  return allowedCountries.includes(country as Country);
};

export const isValidLanguage = (lang: string | undefined) => {
  return allowedLanguages.includes(lang as Language);
};



/**
 * Locales of the site. Vietnamese lives at the root, English under /en/.
 * Adding a language = one dictionary in ./ui/, one entry here and the same
 * key in every bilingual field of src/data/ (type `Text`).
 */
export const LOCALES = {
  vi: { label: 'Tiếng Việt', short: 'VI', hreflang: 'vi-VN', ogLocale: 'vi_VN' },
  en: { label: 'English', short: 'EN', hreflang: 'en', ogLocale: 'en_US' },
} as const;

export type Locale = keyof typeof LOCALES;
export const DEFAULT_LOCALE: Locale = 'vi';
export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

export const SITE_URL = 'https://www.pando-ecotech.com.vn';

/** Pages that exist in every locale; the value is the URL segment (same in all languages). */
export const PAGES = {
  home: '',
  products: 'san-pham',
  story: 'cau-chuyen',
  news: 'tin-tuc',
  order: 'dat-hang',
  contact: 'lien-he',
  returns: 'chinh-sach-doi-tra',
} as const;

export type PageKey = keyof typeof PAGES;

export function isLocale(value: string | undefined): value is Locale {
  return !!value && value in LOCALES;
}

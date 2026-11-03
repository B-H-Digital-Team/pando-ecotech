import { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, PAGES, SITE_URL, type Locale, type PageKey } from './config';
import vi from './ui/vi';
import en from './ui/en';
import type { Dict } from './ui/vi';

const DICTIONARIES: Record<Locale, Dict> = { vi, en };

/** A string written once per language (src/data/). */
export type Text = Record<Locale, string>;
export type TextList = Record<Locale, string[]>;

export function useTranslations(locale: Locale): Dict {
  return DICTIONARIES[locale];
}

/** Pick the current language out of a bilingual field. */
export function tx<T>(locale: Locale, value: Record<Locale, T>): T {
  return value[locale] ?? value[DEFAULT_LOCALE];
}

/** Root-relative URL: a page key ('products'), or a raw path under the locale ('san-pham/ghe'). */
export function localePath(locale: Locale, page: PageKey | string = 'home'): string {
  const segment = page in PAGES ? PAGES[page as PageKey] : page;
  const prefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;
  return segment ? `${prefix}/${segment.replace(/^\/|\/$/g, '')}/` : `${prefix}/`;
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

/** hreflang alternates for one page, including x-default (Vietnamese). */
export function alternates(page: PageKey | string) {
  const links = LOCALE_CODES.map((locale) => ({
    hreflang: LOCALES[locale].hreflang,
    href: absoluteUrl(localePath(locale, page)),
    locale,
  }));
  return [...links, { hreflang: 'x-default', href: absoluteUrl(localePath(DEFAULT_LOCALE, page)), locale: DEFAULT_LOCALE }];
}

/** getStaticPaths() for a page that exists in every locale. */
export function localeStaticPaths() {
  return LOCALE_CODES.map((locale) => ({
    params: { lang: locale === DEFAULT_LOCALE ? undefined : locale },
    props: { locale },
  }));
}

/** Replace {name} placeholders. */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

/** 95000 -> "95.000đ" (vi) / "95,000 VND" (en). */
export function money(locale: Locale, amount: number): string {
  return locale === 'vi' ? `${amount.toLocaleString('vi-VN')}đ` : `${amount.toLocaleString('en-US')} VND`;
}

export { DEFAULT_LOCALE, LOCALES, LOCALE_CODES, PAGES };
export type { Locale, PageKey, Dict };

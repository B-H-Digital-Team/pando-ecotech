import type { Text } from '../i18n';

/**
 * Company facts, scraped 2026-11-03 from pando-ecotech.com.vn, the Pando
 * Facebook and TikTok pages and the order form (docs.google.com/forms).
 */
export const COMPANY = {
  name: 'Pando Ecotech',
  legalName: 'Công ty Cổ phần Pando Ecotech',
  legalNameEn: 'Pando Ecotech Joint Stock Company',
  taxId: '0319201550',
  phone: '033 884 5905',
  phoneHref: 'tel:+84338845905',
  email: 'pando.ecotech@gmail.com',
  zalo: 'https://zalo.me/3067461095760930436',
  facebook: 'https://www.facebook.com/Pando.ecotech',
  tiktok: 'https://www.tiktok.com/@pandoecotech',
  orderForm: 'https://docs.google.com/forms/d/e/1FAIpQLSc_GZxaQylPDokTdodHYb8J0YtObBiUkceIb1W3UOK9czqdgA/viewform',
  oldSite: 'https://www.pando-ecotech.com.vn/',
  address: {
    vi: '38/10 Đường 147, Tổ 7, Khu phố 3, Phường Phước Long, Thành phố Hồ Chí Minh, Việt Nam',
    en: '38/10 Street 147, Group 7, Quarter 3, Phuoc Long Ward, Ho Chi Minh City, Vietnam',
  } satisfies Text,
  street: '38/10 Đường 147, Tổ 7, Khu phố 3',
  locality: 'Phường Phước Long, Thành phố Hồ Chí Minh',
  geo: { lat: 10.832384, lng: 106.772954 },
  mapEmbed: 'https://maps.google.com/maps?q=10.832384,106.772954&z=17&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=10.832384,106.772954',
  founded: 2020,
  ecotechFounded: 2025,
} as const;

/** Bank transfer details given on the order form. */
export const PAYMENT = {
  bank: 'MB Bank',
  account: '0935832459',
  holder: 'Phạm Thị Ngọc Diễm',
} as const;

/** Delivery promise and fees from the order form (fees paid on delivery, at the carrier's real rate). */
export const SHIPPING = {
  innerDays: '1',
  outerDays: '1-3',
  inner: { min: 15000, max: 20000 },
  outer: { min: 20000, max: 35000 },
} as const;


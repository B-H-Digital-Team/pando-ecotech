import type { Text } from '../i18n';

/** What can be ordered today, with prices, exactly as listed on the Pando order form. */
export interface ShopItem {
  id: string;
  name: Text;
  unit: Text;
  price: number;
  group: 'candle' | 'coaster' | 'keychain';
  /** Product page (src/data/products.ts) or a photo; icon cards otherwise. */
  product?: string;
  photo?: string;
  /** Swatch for the finish. */
  finish: 'natural' | 'titan' | 'warm';
}

const PIECE: Text = { vi: 'cái', en: 'piece' };

export const SHOP: ShopItem[] = [
  {
    id: 'candle-dog',
    group: 'candle',
    name: { vi: 'Chậu nến cún thơm', en: 'Scented puppy candle pot' },
    unit: { vi: 'chậu', en: 'pot' },
    price: 95000,
    finish: 'warm',
  },
  {
    id: 'candle-round',
    group: 'candle',
    name: { vi: 'Chậu nến tròn thơm', en: 'Scented round candle pot' },
    unit: PIECE,
    price: 75000,
    finish: 'warm',
  },
  {
    id: 'coaster-natural-rim',
    group: 'coaster',
    name: { vi: 'Tấm lót ly màu nguyên bản, có viền', en: 'Coaster, natural colour, with rim' },
    unit: PIECE,
    price: 25000,
    product: 'tam-lot-ly-ba-ca-phe',
    photo: 'coaster-coffee-tray',
    finish: 'natural',
  },
  {
    id: 'coaster-titan-rim',
    group: 'coaster',
    name: { vi: 'Tấm lót ly màu xám titan, có viền', en: 'Coaster, titanium grey, with rim' },
    unit: PIECE,
    price: 29000,
    product: 'tam-lot-ly-ba-ca-phe',
    photo: 'coaster-coffee-tray-2',
    finish: 'titan',
  },
  {
    id: 'coaster-natural',
    group: 'coaster',
    name: { vi: 'Tấm lót ly màu nguyên bản, không viền', en: 'Coaster, natural colour, no rim' },
    unit: PIECE,
    price: 18000,
    product: 'tam-lot-ly-ba-ca-phe',
    photo: 'coaster-trio',
    finish: 'natural',
  },
  {
    id: 'coaster-titan',
    group: 'coaster',
    name: { vi: 'Tấm lót ly màu xám titan, không viền', en: 'Coaster, titanium grey, no rim' },
    unit: PIECE,
    price: 19000,
    product: 'tam-lot-ly-ba-ca-phe',
    photo: 'coaster-coffee-desk',
    finish: 'titan',
  },
  {
    id: 'keychain-bean',
    group: 'keychain',
    name: { vi: 'Móc khóa hạt cà phê, màu nguyên bản', en: 'Coffee-bean keychain, natural' },
    unit: PIECE,
    price: 18000,
    finish: 'natural',
  },
  {
    id: 'keychain-bean-titan',
    group: 'keychain',
    name: { vi: 'Móc khóa hạt cà phê, xám titan', en: 'Coffee-bean keychain, titanium grey' },
    unit: PIECE,
    price: 18000,
    finish: 'titan',
  },
  {
    id: 'keychain-cup',
    group: 'keychain',
    name: { vi: 'Móc khóa tách cà phê, màu nguyên bản', en: 'Coffee-cup keychain, natural' },
    unit: PIECE,
    price: 18000,
    finish: 'natural',
  },
  {
    id: 'keychain-cup-titan',
    group: 'keychain',
    name: { vi: 'Móc khóa tách cà phê, xám titan', en: 'Coffee-cup keychain, titanium grey' },
    unit: PIECE,
    price: 18000,
    finish: 'titan',
  },
];

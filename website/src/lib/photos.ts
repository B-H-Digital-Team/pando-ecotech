import type { ImageMetadata } from 'astro';

/**
 * Every photograph in src/assets/photos/, by file name without extension
 * (scraped from pando-ecotech.com.vn and the Pando Facebook page).
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,png,webp}', { eager: true });

export const PHOTOS: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(files).map(([path, module]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), module.default]),
);

export function photo(name: string): ImageMetadata {
  const found = PHOTOS[name];
  if (!found) throw new Error(`Unknown photo "${name}" (src/assets/photos/)`);
  return found;
}

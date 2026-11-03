/**
 * Headline typography helpers. Dictionaries hold plain sentences; the design
 * sets the last words of a display headline in Fraunces italic.
 */
export interface Part {
  text: string;
  accent: boolean;
}

/** Split a headline into a plain head and an italic tail of `count` words. */
export function accentParts(text: string, count = 2): Part[] {
  const words = text.split(' ');
  if (words.length < count + 2) return [{ text, accent: false }];
  return [
    { text: words.slice(0, -count).join(' '), accent: false },
    { text: words.slice(-count).join(' '), accent: true },
  ];
}

/** Words of a sentence, each with its running index (for staggered motion). */
export function indexedWords(parts: Part[]): { word: string; accent: boolean; index: number }[] {
  let index = 0;
  return parts.flatMap((part) =>
    part.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, accent: part.accent, index: index++ })),
  );
}

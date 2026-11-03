/**
 * BendReel.astro: words run along each ribbon's curve; the scroll velocity
 * bends the curve and pushes the words faster. Reduced motion: still ribbons.
 */
import { scrollVelocity } from './scroll';

const ribbons = [...document.querySelectorAll<SVGSVGElement>('[data-bend]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (ribbons.length && !reduced) {
  const state = ribbons.map((svg) => {
    const path = svg.querySelector<SVGPathElement>('defs path')!;
    const textPath = svg.querySelector<SVGTextPathElement>('textPath')!;
    const text = svg.querySelector<SVGTextElement>('text')!;
    return { dir: Number(svg.dataset.bend) || 1, path, textPath, length: text.getComputedTextLength() / 3, offset: 0, bend: 0, drawn: Number.NaN };
  });
  let visible = false;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(ribbons[0].parentElement!);
  const tick = (): void => {
    if (visible && !document.hidden) {
      const v = scrollVelocity();
      for (const ribbon of state) {
        const target = Math.max(-90, Math.min(90, v * 4)) * ribbon.dir;
        ribbon.bend += (target - ribbon.bend) * 0.08;
        const bend = Math.round(ribbon.bend * 2) / 2;
        if (bend !== ribbon.drawn) {
          ribbon.drawn = bend;
          ribbon.path.setAttribute('d', `M-200 110 Q720 ${110 + bend} 1640 110`);
        }
        ribbon.offset -= (0.8 + Math.abs(v) * 0.6) * ribbon.dir;
        // Loop on one copy of the words, so the run never ends.
        if (ribbon.offset < -ribbon.length) ribbon.offset += ribbon.length;
        if (ribbon.offset > 0) ribbon.offset -= ribbon.length;
        ribbon.textPath.setAttribute('startOffset', ribbon.offset.toFixed(1));
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export {};

/**
 * Hovering a [data-ripple] photo sends a ripple across it, like a drop in a
 * cup: the shared SVG filter #ripple (Base.astro) has its displacement eased
 * from strong to zero, then the filter is removed again.
 */
const map = document.querySelector<SVGFEDisplacementMapElement>('#ripple feDisplacementMap');
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (map && fine && !reduced) {
  let frame = 0;
  let current: HTMLElement | null = null;
  document.querySelectorAll<HTMLElement>('[data-ripple]').forEach((media) => {
    media.closest('.product-card, a')?.addEventListener('pointerenter', () => {
      cancelAnimationFrame(frame);
      current?.classList.remove('rippling');
      current = media;
      media.classList.add('rippling');
      const start = performance.now();
      const step = (now: number): void => {
        const t = Math.min(1, (now - start) / 900);
        // A damped wave: strong at first, settling to stillness.
        const scale = 55 * (1 - t) * (1 - t) * Math.abs(Math.cos(t * 9));
        map.setAttribute('scale', scale.toFixed(1));
        if (t < 1) frame = requestAnimationFrame(step);
        else media.classList.remove('rippling');
      };
      frame = requestAnimationFrame(step);
    });
  });
}

export {};

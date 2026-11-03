/**
 * Process.astro: one caramel shape morphs as the four steps scroll past,
 * coffee bean -> coaster -> planter -> cat (GSAP MorphSVG, loaded only when
 * the section comes near). The step facing the shape is marked current.
 */
const section = document.querySelector<HTMLElement>('[data-morph]');

const SHAPES = [
  'M60 10C95 10 112 45 102 80 92 112 55 120 35 105 10 88 12 45 30 25 38 15 48 10 60 10Z',
  'M60 10A50 50 0 1 1 59.9 10Z',
  'M20 28H100L92 104Q90 112 82 112H38Q30 112 28 104Z',
  'M25 112C8 112 8 72 24 56L20 16 46 40C55 36 65 36 74 40L100 16 96 56C112 72 112 112 95 112Z',
];

if (section && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const shape = section.querySelector<SVGPathElement>('.morph-shape')!;
  const steps = [...section.querySelectorAll<HTMLElement>('.step')];
  const load = async (): Promise<void> => {
    const [{ gsap }, { MorphSVGPlugin }] = await Promise.all([import('gsap'), import('gsap/MorphSVGPlugin')]);
    gsap.registerPlugin(MorphSVGPlugin);
    const timeline = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut', duration: 1 } });
    SHAPES.slice(1).forEach((d) => timeline.to(shape, { morphSVG: d }));
    let current = -1;
    const update = (): void => {
      const rect = section.getBoundingClientRect();
      const span = Math.max(1, rect.height - innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / span));
      timeline.progress(progress);
      const index = Math.min(steps.length - 1, Math.round(progress * (steps.length - 1)));
      if (index !== current) {
        current = index;
        steps.forEach((step, i) => step.classList.toggle('is-current', i === index));
        section.style.setProperty('--step', String(index));
      }
    };
    addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    update();
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void load();
    },
    { rootMargin: '600px 0px' },
  );
  observer.observe(section);
}

export {};

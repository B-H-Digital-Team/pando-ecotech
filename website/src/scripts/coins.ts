/**
 * The material coin ring (Materials.astro): turns on its own, faster while
 * the page scrolls, follows a drag with momentum, and glides to a coin when
 * its name is chosen. The name of the coin facing front is marked pressed.
 * Reduced motion: no drift, choosing a name jumps.
 */
import { scrollVelocity } from './scroll';

const stage = document.querySelector<HTMLElement>('[data-coins]');

if (stage) {
  const ring = stage.querySelector<HTMLElement>('.ring')!;
  const count = stage.querySelectorAll('[data-coin]').length;
  const step = 360 / count;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-goto]')];
  const names = buttons[0]?.closest<HTMLElement>('.names');
  let touchingNames = false;
  names?.addEventListener('pointerdown', () => (touchingNames = true));
  addEventListener('pointerup', () => (touchingNames = false));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let angle = 0;
  let spin = reduced ? 0 : 0.12;
  let goal: number | null = null;
  let dragging = false;
  let lastX = 0;
  let visible = false;
  let front = -1;

  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(stage);

  const render = (): void => {
    ring.style.transform = `rotateX(-10deg) rotateY(${(-angle).toFixed(2)}deg)`;
    const index = (((Math.round(angle / step) % count) + count) % count) as number;
    if (index !== front) {
      front = index;
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      // On phones the names scroll sideways: bring the front one into view, unless the visitor is swiping them.
      const current = buttons[index]?.parentElement;
      if (names && current && !touchingNames && names.scrollWidth > names.clientWidth) {
        const left = current.offsetLeft - (names.clientWidth - current.offsetWidth) / 2;
        names.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' });
      }
    }
  };

  stage.addEventListener('pointerdown', (event) => {
    dragging = true;
    goal = null;
    lastX = event.clientX;
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    angle -= dx * 0.35;
    spin = -dx * 0.35;
    render();
  });
  const release = (): void => {
    dragging = false;
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      const index = Number(button.dataset.goto);
      // The nearest turn that brings this coin to the front.
      const base = Math.round(angle / 360) * 360 + index * step;
      goal = [base - 360, base, base + 360].reduce((a, b) => (Math.abs(b - angle) < Math.abs(a - angle) ? b : a));
      if (reduced) {
        angle = goal;
        goal = null;
        render();
      }
    }),
  );

  const tick = (): void => {
    if (visible && !dragging && !reduced) {
      if (goal !== null) {
        angle += (goal - angle) * 0.08;
        if (Math.abs(goal - angle) < 0.05) {
          angle = goal;
          goal = null;
          spin = 0;
        }
      } else {
        // Momentum from a drag eases back to a slow, steady drift.
        spin += (0.12 - spin) * 0.03;
        angle += spin + Math.abs(scrollVelocity()) * 0.12;
      }
      render();
    }
    requestAnimationFrame(tick);
  };
  render();
  requestAnimationFrame(tick);
}

export {};

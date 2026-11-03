/**
 * Cylinder.astro: the photo cylinder follows the pointer while it is dragged,
 * coasts to a stop with momentum when released, and turns with the page as it
 * scrolls. It does not spin on its own. A drag is never taken for a click
 * (motion.ts checks data-dragging before opening the lightbox).
 */
const stage = document.querySelector<HTMLElement>('[data-cylinder]');
const flat = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (stage && !flat) {
  const cyl = stage.querySelector<HTMLElement>('.cyl')!;
  let turn = 0;
  let spin = 0;
  let down = false;
  let moved = 0;
  let lastX = 0;
  let lastScroll = window.scrollY;
  let visible = false;
  let shown = Number.NaN;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { rootMargin: '200px 0px' }).observe(stage);

  const apply = (): void => {
    if (turn === shown) return;
    shown = turn;
    cyl.style.transform = `translateZ(calc(-1 * var(--r))) rotateY(${turn.toFixed(2)}deg)`;
  };

  stage.addEventListener('pointerdown', (event) => {
    down = true;
    moved = 0;
    spin = 0;
    lastX = event.clientX;
    stage.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointermove', (event) => {
    if (!down) return;
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    moved += Math.abs(dx);
    if (moved > 6) cyl.dataset.dragging = 'true';
    // The photo under the pointer travels with it.
    turn += dx * 0.22;
    // A flick keeps some momentum, never a wild spin.
    spin = Math.max(-3, Math.min(3, dx * 0.22));
    apply();
  });
  const release = (): void => {
    if (!down) return;
    down = false;
    stage.classList.remove('is-dragging');
    // Let the click that ends a drag see the flag, then clear it.
    setTimeout(() => delete cyl.dataset.dragging, 0);
  };
  stage.addEventListener('pointerup', release);
  stage.addEventListener('pointercancel', release);

  const tick = (): void => {
    const scrolled = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    if (visible && !down && !document.hidden) {
      // Momentum after a drag, plus a turn proportional to the page scroll.
      spin *= 0.94;
      if (Math.abs(spin) < 0.01) spin = 0;
      turn += spin - scrolled * 0.12;
      apply();
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export {};

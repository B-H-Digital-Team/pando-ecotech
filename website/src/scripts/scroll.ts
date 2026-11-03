/**
 * Inertial smooth scrolling (Lenis) shared by every effect that reacts to
 * scroll speed. Lenis drives the native scroll position, so sticky elements
 * and CSS scroll timelines keep working. Off with reduced motion or touch.
 */
import Lenis from 'lenis';

let lenis: Lenis | null = null;
let velocity = 0;
const listeners = new Set<(v: number) => void>();

export function startScroll(): void {
  if (lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis({ lerp: 0.14, smoothWheel: true, anchors: { offset: -90 } });
  lenis.on('scroll', (instance: Lenis) => {
    velocity = instance.velocity;
    listeners.forEach((fn) => fn(velocity));
  });
  const raf = (time: number): void => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

/** Current scroll speed in px per frame (0 without Lenis). */
export function scrollVelocity(): number {
  return velocity;
}

export function onVelocity(fn: (v: number) => void): void {
  listeners.add(fn);
}

export function scrollToTop(): void {
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Freeze the page under a modal (lightbox, quick view). */
export function lockScroll(locked: boolean): void {
  if (locked) lenis?.stop();
  else lenis?.start();
}

/**
 * The site's runtime, on every page:
 * - smooth inertial scroll (scroll.ts) and the floating order bar (cart.ts);
 * - entrances: [data-reveal] / [data-reveal-group] get .is-on once in view;
 * - the coffee-pour transition between pages (links without [data-vt]);
 * - header bar, reading progress, back to top, light/dark toggle (a circle
 *   grows from the button), pointer glow, tilt, magnetic buttons;
 * - [data-copy] buttons, [data-lightbox] galleries, the mobile menu.
 */
import { lockScroll, scrollToTop, startScroll } from './scroll';
import { initAddButtons, initCartBar } from './cart';

const reduced = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = (): boolean => matchMedia('(hover: hover) and (pointer: fine)').matches;

function initReveals(): void {
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-on');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  document
    .querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-group], .stain')
    .forEach((target) => observer.observe(target));
}

/** The opening moment leaves the page once played, taking its loops with it. */
function initPreloader(): void {
  const preloader = document.querySelector('.preloader');
  if (!preloader) return;
  if (document.documentElement.dataset.intro === 'seen') preloader.remove();
  else setTimeout(() => preloader.remove(), 3400);
}

/** Blocks with endless loops (specks, reels, stamps) pause them while off screen. */
function initIdle(): void {
  const blocks = document.querySelectorAll<HTMLElement>('.grounds, .drift-layer, .marquee, .stamp, .hero .bloom');
  if (!blocks.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.target.classList.toggle('is-idle', !entry.isIntersecting)),
    { rootMargin: '100px 0px' },
  );
  blocks.forEach((block) => observer.observe(block));
}

function initScroll(): void {
  const root = document.documentElement;
  const header = document.querySelector<HTMLElement>('.site-header');
  const fab = document.querySelector<HTMLElement>('.fab-top');
  // The reading line uses a CSS scroll timeline where it exists; only older browsers need the variable.
  const bar = CSS.supports('animation-timeline: scroll()') ? null : document.querySelector<HTMLElement>('.scroll-progress');
  let lastY = window.scrollY;
  let ticking = false;
  const update = (): void => {
    const y = window.scrollY;
    const max = Math.max(1, root.scrollHeight - window.innerHeight);
    // Written on the two small elements that use it, never on <html>: a variable
    // on the root would restyle the whole page on every scrolled frame.
    const progress = Math.min(1, y / max).toFixed(3);
    fab?.style.setProperty('--progress', progress);
    bar?.style.setProperty('--progress', progress);
    header?.classList.toggle('is-scrolled', y > 8);
    // The bar tucks away while reading down and returns on the way up.
    header?.classList.toggle('is-tucked', y > 400 && y > lastY + 2 && !header.querySelector('details[open]'));
    if (y < lastY - 2) header?.classList.remove('is-tucked');
    fab?.classList.toggle('is-visible', y > window.innerHeight * 0.8);
    lastY = y;
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  update();

  document.querySelectorAll<HTMLAnchorElement>('[data-to-top]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      scrollToTop();
      history.replaceState(null, '', location.pathname + location.search);
    });
  });
}

/**
 * Coffee-pour page transition: espresso pours down over the page, the next
 * page opens covered (public/theme.js adds .pour-in) and the sheet drains.
 * Cards with [data-vt] keep the photo-morph view transition instead.
 */
function initPour(): void {
  const root = document.documentElement;
  if (root.classList.contains('pour-in')) {
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-draining')));
    setTimeout(() => root.classList.remove('pour-in', 'is-draining'), 750);
  }
  if (reduced()) return;
  document.addEventListener('click', (event) => {
    const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target === '_blank' || link.hasAttribute('download') || link.hasAttribute('data-vt') || link.closest('[data-lightbox]')) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    if (url.pathname === location.pathname && url.search === location.search) return;
    event.preventDefault();
    root.classList.add('is-pouring');
    try {
      sessionStorage.setItem('pando-pour', '1');
    } catch {
      // Storage blocked: the next page simply appears.
    }
    setTimeout(() => (location.href = url.href), 420);
  });
  // Leaving under the espresso sheet: no browser cross-fade on top of it.
  addEventListener('pageswap', (event) => {
    const transition = (event as Event & { viewTransition?: ViewTransition | null }).viewTransition;
    if (!transition || !root.classList.contains('is-pouring')) return;
    transition.ready.catch(() => undefined);
    transition.finished.catch(() => undefined);
    transition.skipTransition();
  });
  // Back/forward from the cache: never leave the sheet on screen.
  addEventListener('pageshow', (event) => {
    if (event.persisted) root.classList.remove('is-pouring', 'pour-in', 'is-draining');
  });
}

const THEME_KEY = 'pando-theme';

/** The browser bar takes the page ground of the theme in use (light unless the visitor chose dark). */
function syncThemeColor(): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = getComputedStyle(document.body).backgroundColor;
}

function initThemeToggle(): void {
  const root = document.documentElement;
  syncThemeColor();
  const current = (): 'light' | 'dark' => {
    if (root.dataset.theme === 'dark' || root.dataset.theme === 'light') return root.dataset.theme;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      const rect = button.getBoundingClientRect();
      root.style.setProperty('--vx', `${rect.left + rect.width / 2}px`);
      root.style.setProperty('--vy', `${rect.top + rect.height / 2}px`);
      const apply = (): void => {
        root.classList.add('theme-switching');
        root.dataset.theme = next;
        void root.offsetWidth;
        syncThemeColor();
        requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('theme-switching')));
      };
      if ('startViewTransition' in document && !reduced()) {
        root.classList.add('theme-reveal');
        const transition = document.startViewTransition(apply);
        transition.finished.finally(() => root.classList.remove('theme-reveal'));
      } else {
        apply();
      }
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // Storage blocked: the choice lasts for this page only.
      }
    });
  });
}

function initTilt(): void {
  if (!finePointer() || reduced()) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const strength = Number(card.dataset.tilt) || 6;
    let queued = false;
    let px = 0;
    let py = 0;
    // One measurement and one write per frame, however fast the pointer moves.
    card.addEventListener('pointermove', (event) => {
      px = event.clientX;
      py = event.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const rect = card.getBoundingClientRect();
        const x = (px - rect.left) / rect.width - 0.5;
        const y = (py - rect.top) / rect.height - 0.5;
        card.style.setProperty('--ry', `${(x * strength).toFixed(2)}deg`);
        card.style.setProperty('--rx', `${(-y * strength).toFixed(2)}deg`);
      });
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--rx');
      card.style.removeProperty('--ry');
    });
  });
}

function initHalo(): void {
  if (!finePointer()) return;
  const halo = document.querySelector<HTMLElement>('.pointer-halo');
  if (!halo) return;
  let x = -999;
  let y = -999;
  let queued = false;
  addEventListener(
    'pointermove',
    (event) => {
      x = event.clientX;
      y = event.clientY;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        halo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        halo.style.opacity = '1';
        queued = false;
      });
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => (halo.style.opacity = '0'));
}

function initMagnetic(): void {
  if (!finePointer() || reduced()) return;
  document.querySelectorAll<HTMLElement>('.btn:not(.btn-sm)').forEach((button) => {
    button.addEventListener('pointermove', (event) => {
      const rect = button.getBoundingClientRect();
      const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
      button.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    });
    button.addEventListener('pointerleave', () => {
      button.style.translate = '';
    });
  });
}

function initSpotlight(): void {
  if (!finePointer()) return;
  let queued = false;
  let last: PointerEvent | null = null;
  // One measurement and one write per frame, on the hovered surface only.
  document.addEventListener(
    'pointermove',
    (event) => {
      last = event;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const target = (last?.target as Element | null)?.closest<HTMLElement>('.spot');
        if (!target || !last) return;
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--mx', `${(last.clientX - rect.left).toFixed(0)}px`);
        target.style.setProperty('--my', `${(last.clientY - rect.top).toFixed(0)}px`);
      });
    },
    { passive: true },
  );
}

/** <button data-copy="0935832459">: copies the value and confirms for a moment. */
function initCopy(): void {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
        button.classList.add('is-copied');
        setTimeout(() => button.classList.remove('is-copied'), 1600);
      } catch {
        // Clipboard blocked: the value stays visible on the page.
      }
    });
  });
}

/** [data-lightbox] wraps links to full-size photos; they open in the shared <dialog>. */
function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>('.lightbox');
  if (!dialog) return;
  const img = dialog.querySelector<HTMLImageElement>('img')!;
  const caption = dialog.querySelector<HTMLElement>('figcaption')!;
  let group: HTMLAnchorElement[] = [];
  let index = 0;
  const show = (i: number): void => {
    index = (i + group.length) % group.length;
    const link = group[index];
    img.classList.remove('is-in');
    img.src = link.href;
    img.alt = link.dataset.alt ?? '';
    caption.textContent = link.dataset.alt ?? '';
    img
      .decode?.()
      .catch(() => undefined)
      .finally(() => img.classList.add('is-in'));
  };
  const open = (links: HTMLAnchorElement[], i: number): void => {
    group = links;
    show(i);
    dialog.showModal();
    lockScroll(true);
  };
  document.querySelectorAll<HTMLElement>('[data-lightbox]').forEach((gallery) => {
    const links = [...gallery.querySelectorAll<HTMLAnchorElement>('a[href]')];
    links.forEach((link, i) =>
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // A drag on the 3D gallery is not a click.
        if (gallery.dataset.dragging === 'true') return;
        open(links, i);
      }),
    );
  });
  dialog.addEventListener('close', () => lockScroll(false));
  dialog.querySelector('[data-prev]')?.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-next]')?.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(index - 1);
    if (event.key === 'ArrowRight') show(index + 1);
  });
}

/** The mobile menu closes when a link inside it is followed or Escape is pressed. */
function initMenu(): void {
  const menu = document.querySelector<HTMLDetailsElement>('.mobile-menu');
  if (!menu) return;
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => menu.removeAttribute('open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.open) {
      menu.removeAttribute('open');
      menu.querySelector('summary')?.focus();
    }
  });
}

startScroll();
initReveals();
initPreloader();
initIdle();
initScroll();
initPour();
initThemeToggle();
initTilt();
initSpotlight();
initHalo();
initMagnetic();
initCopy();
initLightbox();
initMenu();
initCartBar();
initAddButtons();

export {};

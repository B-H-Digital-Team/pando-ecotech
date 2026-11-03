/**
 * The order kept across pages: { shopItemId: quantity } in localStorage
 * (best effort), shared by the order page, product pages, quick view and the
 * floating order bar. Changes are broadcast with a 'pando-cart' event.
 */
export type Cart = Record<string, number>;

const KEY = 'pando-order';
let memory: Cart = {};

export function readCart(): Cart {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Cart;
    memory = Object.fromEntries(Object.entries(saved).filter(([, n]) => n > 0));
  } catch {
    // Storage blocked: keep the in-memory order.
  }
  return { ...memory };
}

export function writeCart(cart: Cart): void {
  memory = Object.fromEntries(Object.entries(cart).filter(([, n]) => n > 0));
  try {
    localStorage.setItem(KEY, JSON.stringify(memory));
  } catch {
    // Storage blocked: the order lasts for this page only.
  }
  dispatchEvent(new CustomEvent('pando-cart', { detail: { ...memory } }));
}

export function setQty(id: string, n: number): void {
  const cart = readCart();
  cart[id] = Math.max(0, Math.min(999, Math.round(n) || 0));
  writeCart(cart);
}

export function addToCart(id: string, n = 1): void {
  const cart = readCart();
  setQty(id, (cart[id] ?? 0) + n);
}

export function onCart(fn: (cart: Cart) => void): void {
  addEventListener('pando-cart', () => fn(readCart()));
  addEventListener('storage', (event) => event.key === KEY && fn(readCart()));
}

/** The floating bar (Base.astro): item count and subtotal, hidden on the order page itself. */
export function initCartBar(): void {
  const bar = document.querySelector<HTMLAnchorElement>('[data-cart-bar]');
  if (!bar) return;
  const prices = JSON.parse(bar.dataset.prices ?? '{}') as Record<string, number>;
  const locale = document.documentElement.lang.startsWith('vi') ? 'vi' : 'en';
  const money = (n: number): string => (locale === 'vi' ? `${n.toLocaleString('vi-VN')}đ` : `${n.toLocaleString('en-US')} VND`);
  const count = bar.querySelector<HTMLElement>('.count')!;
  const sum = bar.querySelector<HTMLElement>('.sum')!;
  const onOrderPage = bar.dataset.here === 'true';
  let last = -1;
  const render = (cart: Cart): void => {
    const items = Object.values(cart).reduce((a, b) => a + b, 0);
    const total = Object.entries(cart).reduce((a, [id, n]) => a + (prices[id] ?? 0) * n, 0);
    count.textContent = String(items);
    sum.textContent = money(total);
    bar.classList.toggle('is-shown', items > 0 && !onOrderPage);
    if (last >= 0 && items !== last) {
      bar.classList.remove('bump');
      void bar.offsetWidth;
      bar.classList.add('bump');
    }
    last = items;
  };
  render(readCart());
  onCart(render);
}

/**
 * Any [data-add="itemId"] button adds one to the order: the label confirms
 * for a moment and a little coffee bean flies to the order bar.
 */
export function initAddButtons(): void {
  document.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-add]');
    if (!button) return;
    addToCart(button.dataset.add ?? '');
    const original = button.dataset.label ?? button.innerHTML;
    button.dataset.label = original;
    button.textContent = `✓ ${button.dataset.addedLabel ?? ''}`;
    setTimeout(() => (button.innerHTML = original), 1300);
    const bar = document.querySelector<HTMLElement>('[data-cart-bar]');
    if (!bar || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const from = button.getBoundingClientRect();
    const to = bar.getBoundingClientRect();
    const bean = document.createElement('span');
    bean.className = 'fly-bean';
    document.body.append(bean);
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = (to.top > innerHeight ? innerHeight - 40 : to.top + to.height / 2) - (from.top + from.height / 2);
    bean.style.left = `${from.left + from.width / 2}px`;
    bean.style.top = `${from.top + from.height / 2}px`;
    bean
      .animate(
        [
          { transform: 'translate(-50%, -50%) scale(1) rotate(0deg)', opacity: 1 },
          { transform: `translate(calc(-50% + ${dx * 0.5}px), calc(-50% + ${dy * 0.5 - 120}px)) scale(1.3) rotate(200deg)`, opacity: 1, offset: 0.5 },
          { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.4) rotate(400deg)`, opacity: 0.2 },
        ],
        { duration: 750, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' },
      )
      .finished.finally(() => bean.remove());
  });
}

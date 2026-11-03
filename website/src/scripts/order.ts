/**
 * The order builder (dat-hang.astro): quantity steppers, a live summary with
 * subtotal and the shipping range for the chosen area, and an order text the
 * visitor copies before sending it on Zalo. Each line can be removed, and the
 * whole order cleared (with an undo). Quantities live in the shared
 * order (cart.ts), so items added on product pages show up here.
 */
interface Config {
  locale: 'vi' | 'en';
  items: { id: string; name: string; price: number; unit: string }[];
  shipping: { inner: { min: number; max: number }; outer: { min: number; max: number } };
  zalo: string;
  text: {
    intro: string;
    total: string;
    empty: string;
    copied: string;
    copy: string;
    count: string;
    remove: string;
    cleared: string;
    undo: string;
  };
}

import { onCart, readCart, writeCart } from './cart';

const root = document.querySelector<HTMLElement>('[data-order]');

if (root) {
  const config = JSON.parse(root.dataset.order ?? '{}') as Config;
  const qty = new Map<string, number>();
  const money = (n: number): string =>
    config.locale === 'vi' ? `${n.toLocaleString('vi-VN')}đ` : `${n.toLocaleString('en-US')} VND`;

  const lines = root.querySelector<HTMLElement>('[data-lines]')!;
  const totalEl = root.querySelector<HTMLElement>('[data-total]')!;
  const copyButton = root.querySelector<HTMLButtonElement>('[data-copy-order]')!;
  const zaloLink = root.querySelector<HTMLAnchorElement>('[data-send-zalo]')!;
  const countEl = root.querySelector<HTMLElement>('[data-count]')!;
  const clearButton = root.querySelector<HTMLButtonElement>('[data-clear]')!;
  // The order just cleared, kept until the visitor undoes it or picks something new.
  let undoCart: Record<string, number> | null = null;
  const removeIcon =
    '<svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5 5l10 10M15 5 5 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  const load = (): void => {
    qty.clear();
    for (const [id, n] of Object.entries(readCart())) qty.set(id, n);
  };
  load();

  // The list hides its scrollbar: a fade at the bottom shows while more lines wait below.
  const fade = (): void => {
    lines.parentElement?.classList.toggle('has-more', lines.scrollHeight - lines.scrollTop - lines.clientHeight > 2);
  };
  lines.addEventListener('scroll', fade, { passive: true });
  addEventListener('resize', fade, { passive: true });

  const subtotal = (): number => config.items.reduce((sum, item) => sum + (qty.get(item.id) ?? 0) * item.price, 0);

  const orderText = (): string => {
    const rows = config.items
      .filter((item) => (qty.get(item.id) ?? 0) > 0)
      .map((item) => `- ${item.name} x ${qty.get(item.id)} = ${money(item.price * (qty.get(item.id) ?? 0))}`);
    return [config.text.intro, ...rows, config.text.total.replace('{total}', money(subtotal()))].join('\n');
  };

  const render = (): void => {
    lines.replaceChildren();
    const chosen = config.items.filter((item) => (qty.get(item.id) ?? 0) > 0);
    if (chosen.length) undoCart = null;
    if (!chosen.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = undoCart ? config.text.cleared : config.text.empty;
      if (undoCart) {
        const undo = document.createElement('button');
        undo.type = 'button';
        undo.className = 'undo';
        undo.textContent = config.text.undo;
        undo.addEventListener('click', () => {
          const saved = undoCart;
          undoCart = null;
          if (saved) writeCart(saved);
        });
        li.append(' ', undo);
      }
      lines.append(li);
    }
    for (const item of chosen) {
      const n = qty.get(item.id) ?? 0;
      const li = document.createElement('li');
      li.className = 'line';
      const name = document.createElement('span');
      name.className = 'line-name';
      name.textContent = item.name;
      const each = document.createElement('small');
      each.textContent = `${n} × ${money(item.price)}`;
      name.append(each);
      const price = document.createElement('b');
      price.textContent = money(item.price * n);
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'line-remove';
      remove.innerHTML = removeIcon;
      remove.setAttribute('aria-label', config.text.remove.replace('{name}', item.name));
      remove.title = remove.getAttribute('aria-label') ?? '';
      remove.addEventListener('click', () => set(item.id, 0));
      li.append(name, price, remove);
      lines.append(li);
    }
    fade();
    const pieces = chosen.reduce((sum, item) => sum + (qty.get(item.id) ?? 0), 0);
    countEl.hidden = clearButton.hidden = !chosen.length;
    countEl.textContent = config.text.count.replace('{n}', String(pieces));
    root.querySelectorAll<HTMLElement>('[data-item]').forEach((row) => {
      const n = qty.get(row.dataset.item ?? '') ?? 0;
      row.querySelector('input')!.value = String(n);
      row.classList.toggle('has-qty', n > 0);
    });
    const total = subtotal();
    if (totalEl.textContent !== money(total)) {
      totalEl.textContent = money(total);
      totalEl.classList.remove('bump');
      void totalEl.offsetWidth;
      totalEl.classList.add('bump');
    }
    copyButton.disabled = total === 0;
  };

  const set = (id: string, n: number): void => {
    const clean = Math.max(0, Math.min(999, Math.round(n) || 0));
    if (clean) qty.set(id, clean);
    else qty.delete(id);
    writeCart(Object.fromEntries(qty));
  };
  onCart(() => {
    load();
    render();
  });

  clearButton.addEventListener('click', () => {
    const saved = Object.fromEntries(qty);
    writeCart({});
    undoCart = saved;
    render();
    lines.querySelector<HTMLButtonElement>('.undo')?.focus();
  });

  root.querySelectorAll<HTMLElement>('[data-item]').forEach((row) => {
    const id = row.dataset.item ?? '';
    row.querySelectorAll<HTMLButtonElement>('[data-step]').forEach((button) =>
      button.addEventListener('click', () => set(id, (qty.get(id) ?? 0) + Number(button.dataset.step))),
    );
    row.querySelector('input')!.addEventListener('change', (event) => set(id, Number((event.target as HTMLInputElement).value)));
  });

  const copy = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(orderText());
      return true;
    } catch {
      return false;
    }
  };

  copyButton.addEventListener('click', async () => {
    if (await copy()) {
      copyButton.textContent = config.text.copied;
      copyButton.classList.add('is-done');
      setTimeout(() => {
        copyButton.textContent = config.text.copy;
        copyButton.classList.remove('is-done');
      }, 1800);
    }
  });
  // Zalo cannot prefill a message: copy the order first so it can be pasted in the chat.
  zaloLink.addEventListener('click', () => {
    if (subtotal() > 0) void copy();
  });

  render();
}

export {};

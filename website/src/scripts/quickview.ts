/**
 * QuickView.astro: opens the dialog for a product card's [data-quickview]
 * button and fills it from the JSON catalogue embedded in the dialog.
 */
import { lockScroll } from './scroll';

interface Data {
  products: {
    slug: string;
    name: string;
    tagline: string;
    intro: string;
    category: string;
    materials: { key: string; name: string }[];
    size: string;
    url: string;
    images: string[];
    variants: { id: string; name: string; price: string }[];
  }[];
  labels: { add: string; added: string; ask: string; details: string; size: string; choose: string; zalo: string };
}

const dialog = document.querySelector<HTMLDialogElement>('.qv-dialog');
const source = document.getElementById('qv-data');

if (dialog && source) {
  const { products, labels } = JSON.parse(source.textContent ?? '{}') as Data;
  const $ = <T extends HTMLElement>(selector: string): T => dialog.querySelector<T>(selector)!;
  const main = $<HTMLImageElement>('.qv-main');
  const thumbs = $<HTMLElement>('.qv-thumbs');
  const el = (tag: string, className = '', text = ''): HTMLElement => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  const show = (slug: string): void => {
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
    main.src = product.images[0];
    main.alt = product.name;
    thumbs.replaceChildren(
      ...product.images.map((src, index) => {
        const button = el('button') as HTMLButtonElement;
        button.type = 'button';
        button.setAttribute('aria-pressed', String(index === 0));
        const img = el('img') as HTMLImageElement;
        img.src = src;
        img.alt = '';
        button.append(img);
        button.addEventListener('click', () => {
          main.classList.add('is-swapping');
          main.src = src;
          main.decode?.().finally(() => main.classList.remove('is-swapping'));
          thumbs.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
        });
        return button;
      }),
    );
    $('.qv-cat').textContent = product.category + (product.size ? ` · ${labels.size}: ${product.size}` : '');
    $('#qv-name').textContent = product.name;
    $('.qv-tagline').textContent = product.tagline;
    $('.qv-intro').textContent = product.intro;
    $('.qv-mats').replaceChildren(
      ...product.materials.map((m) => {
        const chip = el('span');
        chip.append(el('span', `swatch sw-${m.key}`), document.createTextNode(m.name));
        return chip;
      }),
    );
    const buy = $('.qv-buy');
    if (product.variants.length) {
      buy.replaceChildren(
        el('small', 'muted', labels.choose),
        ...product.variants.map((v) => {
          const row = el('div', 'variant');
          const text = el('span');
          text.append(el('small', '', v.name), el('b', '', v.price));
          const add = el('button', 'btn btn-accent btn-sm', `+ ${labels.add}`) as HTMLButtonElement;
          add.type = 'button';
          add.dataset.add = v.id;
          add.dataset.addedLabel = labels.added;
          row.append(text, add);
          return row;
        }),
      );
    } else {
      const ask = el('a', 'btn btn-accent', labels.ask) as HTMLAnchorElement;
      ask.href = labels.zalo;
      ask.target = '_blank';
      ask.rel = 'noopener';
      buy.replaceChildren(ask);
    }
    $<HTMLAnchorElement>('.qv-more').href = product.url;
    dialog.showModal();
    lockScroll(true);
  };

  document.addEventListener('click', (event) => {
    const trigger = (event.target as Element | null)?.closest<HTMLElement>('[data-quickview]');
    if (trigger) show(trigger.dataset.quickview ?? '');
  });
  $('[data-qv-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => event.target === dialog && dialog.close());
  dialog.addEventListener('close', () => lockScroll(false));
}

export {};

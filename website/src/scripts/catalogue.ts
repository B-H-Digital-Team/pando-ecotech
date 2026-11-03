/**
 * Product filter chips (san-pham/index.astro): show one category, animated
 * with a view transition where supported, and remember it in the URL (?c=).
 */
const root = document.querySelector<HTMLElement>('[data-catalogue]');

if (root) {
  const chips = [...root.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const cards = [...root.querySelectorAll<HTMLElement>('[data-category]')];
  const label = root.querySelector<HTMLElement>('[data-count-label]');

  const apply = (filter: string): void => {
    let shown = 0;
    for (const card of cards) {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) shown++;
      // Cards already revealed stay visible after filtering.
      card.parentElement?.classList.add('is-on');
    }
    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === filter)));
    if (label) label.textContent = (label.dataset.countLabel ?? '{n}').replace('{n}', String(shown));
  };

  const select = (filter: string): void => {
    const url = new URL(location.href);
    if (filter === 'all') url.searchParams.delete('c');
    else url.searchParams.set('c', filter);
    history.replaceState(null, '', url);
    // Filtering from far down the list: bring the top of the results back into view.
    if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('startViewTransition' in document && !reduced) {
      // Each card glides to its new place: give them temporary names.
      cards.forEach((card, index) => (card.style.viewTransitionName = `card-${index}`));
      const transition = document.startViewTransition(() => apply(filter));
      transition.finished.finally(() => cards.forEach((card) => (card.style.viewTransitionName = '')));
    } else {
      apply(filter);
    }
  };

  chips.forEach((chip) => chip.addEventListener('click', () => select(chip.dataset.filter ?? 'all')));
  const initial = new URL(location.href).searchParams.get('c');
  if (initial && chips.some((chip) => chip.dataset.filter === initial)) apply(initial);
}

export {};

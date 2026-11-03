/*
 * Runs in <head> before the first paint: applies the light/dark choice saved
 * by the header toggle (src/scripts/motion.ts) so the page never flashes the
 * other theme. No saved choice: the system setting decides (color-scheme).
 * Also starts a page reached through the coffee-pour transition covered, and
 * decides whether the home page's opening moment (Preloader.astro) plays:
 * once per visit, not again when the visitor comes from another page here.
 */
(function () {
  try {
    var theme = localStorage.getItem('pando-theme');
    if (theme === 'light' || theme === 'dark') document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    /* Storage blocked: follow the system. */
  }
  try {
    // Arriving through the coffee-pour transition: start covered, motion.ts drains the sheet.
    if (sessionStorage.getItem('pando-pour') === '1') {
      document.documentElement.classList.add('pour-in');
      sessionStorage.removeItem('pando-pour');
      // The espresso sheet is the transition: skip the browser's own cross-fade.
      addEventListener('pagereveal', function (event) {
        var vt = event.viewTransition;
        if (!vt) return;
        vt.ready.catch(function () {});
        vt.finished.catch(function () {});
        vt.skipTransition();
      });
    }
  } catch (error) {
    /* No storage: no transition. */
  }
  try {
    var entry = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
    var reloaded = entry ? entry.type === 'reload' : false;
    var fromThisSite = document.referrer.indexOf(location.origin + '/') === 0;
    var seen = sessionStorage.getItem('pando-intro') === '1';
    if ((fromThisSite || seen) && !reloaded) document.documentElement.setAttribute('data-intro', 'seen');
    sessionStorage.setItem('pando-intro', '1');
  } catch (error) {
    /* No storage: the overture simply plays. */
  }
})();

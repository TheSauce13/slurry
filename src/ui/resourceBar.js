// Thin wrapper — resource display is handled inside characterSheet for Loop 2.
// This module will be used for inline resource change animations in Loop 4+.
export function flashResource(resourceName) {
  const el = document.querySelector(`.sheet-resource.${resourceName} .res-val`);
  if (!el) return;
  el.classList.add('res-flash');
  el.addEventListener('animationend', () => el.classList.remove('res-flash'), { once: true });
}

import { typewrite } from '../utils/typewriter.js';

export function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

export async function renderNarrative(paragraphs, beatName) {
  const pane = document.getElementById('narrative-pane');
  pane.innerHTML = '';

  // Beat label
  const label = document.createElement('div');
  label.className = 'beat-label';
  label.textContent = beatName;
  pane.appendChild(label);

  // Type each paragraph sequentially
  for (const text of paragraphs) {
    const p = document.createElement('p');
    p.className = 'narrative-text';
    pane.appendChild(p);
    await typewrite(p, text, 20);
    await pause(120);
  }
}

export function showLoading() {
  const pane = document.getElementById('narrative-pane');
  let el = pane.querySelector('.loading-fog');
  if (el) return;
  el = document.createElement('div');
  el.className = 'loading-fog';
  el.textContent = 'The fog rolls in…';
  pane.appendChild(el);
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
}

export function hideLoading() {
  document.querySelector('.loading-fog')?.remove();
}

export async function renderCheckResult(success) {
  const pane = document.getElementById('narrative-pane');
  const flash = document.createElement('div');
  flash.className = `check-result ${success ? 'check-success' : 'check-failure'}`;
  flash.textContent = success ? '— Fortune favours —' : '— Fate intervenes —';
  pane.appendChild(flash);
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
  await pause(900);
}

export async function renderConsequence(text) {
  const pane = document.getElementById('narrative-pane');

  const divider = document.createElement('div');
  divider.className = 'narrative-divider';
  divider.textContent = '— — —';
  pane.appendChild(divider);

  const p = document.createElement('p');
  p.className = 'narrative-text consequence-text';
  pane.appendChild(p);

  pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
  await typewrite(p, text, 18);
}

export async function renderChapterEnd(state, aiSummary) {
  const pane = document.getElementById('narrative-pane');

  const divider = document.createElement('div');
  divider.className = 'narrative-divider';
  divider.textContent = '— — —';
  pane.appendChild(divider);

  const heading = document.createElement('div');
  heading.className = 'chapter-end-heading';
  heading.textContent = 'Chapter I — Complete';
  pane.appendChild(heading);

  // AI summary (or static fallback)
  const fallbackText = (() => {
    const relation = state.flags.tollmasterRelation;
    const t = {
      accepted:   'You are the Tollmaster\'s creature, at least for now. Whether that is a beginning or an end remains to be seen.',
      refused:    'You have made an enemy of the most powerful man in Greylock Wharf. You have also kept yourself intact. Time will tell which matters more.',
      countered:  'You negotiated with the Tollmaster and did not come away the worse for it. He will remember that. So should you.',
      threatened: 'The Tollmaster fears you, which is not the same as respecting you, and is considerably more dangerous.',
    };
    return (t[relation] ?? 'Greylock Wharf has taken your measure.') +
      ` Honour: ${state.resources.honour}/20. Health: ${state.resources.health}/10. Coin: ${state.resources.coin}.`;
  })();

  const summaryText = aiSummary ?? fallbackText;
  const paragraphs = summaryText.split(/\n\n+/).map(p => p.trim()).filter(Boolean);

  for (const text of paragraphs) {
    const p = document.createElement('p');
    p.className = 'narrative-text chapter-summary';
    pane.appendChild(p);
    pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
    await typewrite(p, text, 18);
    await pause(100);
  }

  // Stat snapshot
  const snapshot = document.createElement('div');
  snapshot.className = 'chapter-snapshot';
  snapshot.innerHTML = `
    <span>Health ${state.resources.health}/10</span>
    <span>Coin ${state.resources.coin}</span>
    <span>Reputation ${state.resources.reputation}/10</span>
    <span>Honour ${state.resources.honour}/20</span>
  `;
  pane.appendChild(snapshot);
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
}

function pause(ms) {
  return new Promise(r => setTimeout(r, ms));
}

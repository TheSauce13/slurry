import './style.css';
import { initCreationForm, setOnCharacterCreated } from './character/creation.js';
import { subscribe } from './state/gameState.js';
import { showScreen } from './ui/renderer.js';
import { renderCharacterSheet } from './ui/characterSheet.js';
import { startChapter } from './engine/beatEngine.js';
import { getAlignmentLabel } from './character/alignment.js';

// ── Reactive state ──────────────────────────────────────────
subscribe((state) => {
  renderCharacterSheet(state);
  updateMobileBar(state);
});

// ── Character creation → game ───────────────────────────────
setOnCharacterCreated(async (state) => {
  showScreen('screen-game');
  renderCharacterSheet(state);
  updateMobileBar(state);
  await showChapterCard('I', 'A Town Like Any Other');
  await startChapter();
});

initCreationForm();

// ── Chapter title card ──────────────────────────────────────
function showChapterCard(num, title) {
  return new Promise(resolve => {
    const card = document.getElementById('chapter-card');
    const numEl  = card.querySelector('.chapter-card-num');
    const titleEl = card.querySelector('.chapter-card-title');

    numEl.textContent  = `Chapter ${num}`;
    titleEl.textContent = title;

    card.classList.remove('hidden', 'dismissing');

    setTimeout(() => {
      card.classList.add('dismissing');
      card.addEventListener('animationend', () => {
        card.classList.add('hidden');
        resolve();
      }, { once: true });
    }, 2600);
  });
}

// ── Mobile stats bar ────────────────────────────────────────
function updateMobileBar(state) {
  const bar = document.getElementById('mobile-stats-bar');
  if (!bar) return;

  const h = document.getElementById('msb-health');
  const c = document.getElementById('msb-coin');
  const r = document.getElementById('msb-rep');
  const a = document.getElementById('msb-honour-label');

  if (h) h.textContent = state.resources.health;
  if (c) c.textContent = state.resources.coin;
  if (r) r.textContent = state.resources.reputation;
  if (a) a.textContent = getAlignmentLabel(state.resources.honour);
}

// Toggle character sheet drawer on mobile
document.getElementById('mobile-stats-bar')?.addEventListener('click', () => {
  const sheet = document.getElementById('character-sheet');
  const bar   = document.getElementById('mobile-stats-bar');
  const open  = sheet.classList.toggle('sheet-open');
  bar.classList.toggle('open', open);
});

import { getAlignmentLabel } from '../character/alignment.js';
import { getState } from '../state/gameState.js';
import { canWork, workCoinAmount, doWork } from '../engine/workMechanic.js';
import { BEATS } from '../engine/beats.js';

const STAT_LABELS = {
  brawn: 'Brawn',
  graft: 'Graft',
  wit:   'Wit',
  brass: 'Brass',
  guts:  'Guts',
  lurk:  'Lurk',
};

let historyOpen = false;

export function renderCharacterSheet(state) {
  const el = document.getElementById('character-sheet');
  if (!el) return;

  const { character, resources } = state;
  const alignmentLabel = getAlignmentLabel(resources.honour);

  const occupationLabels = {
    canal_worker: 'Canal Worker',
    trader:       'Trader / Fence',
    layabout:     'Layabout',
    soldier:      'Former Soldier',
    clerk:        'Clerk or Scribe',
  };

  const weaponLabels = {
    fists:         'Fists',
    knife:         'Knife',
    cosh:          'Cosh / Club',
    silver_tongue: 'Silver Tongue',
    improvised:    'Improvised',
  };

  const workAvailable = canWork(state);
  const coinAmount    = workCoinAmount(state);
  const worked        = state.flags.workedThisBeat;

  const currentBeat = state.progress.beat > 0
    ? BEATS.find(b => b.id === state.progress.beat)
    : null;

  el.innerHTML = `
    ${currentBeat ? `
    <div class="sheet-section sheet-location">
      <div class="sheet-location-name">${currentBeat.location}</div>
      <div class="sheet-objective">${currentBeat.objective}</div>
    </div>
    ` : ''}

    <div class="sheet-section sheet-header">
      <div class="sheet-title">Character</div>
      <div class="sheet-name">${character.name || '—'}</div>
      <div class="sheet-meta">
        <span>${character.origin === 'local' ? 'Local' : 'Outsider'}</span>
        <span class="sheet-sep">·</span>
        <span>${occupationLabels[character.occupation] ?? character.occupation}</span>
      </div>
      <div class="sheet-weapon">Weapon: ${weaponLabels[character.weapon] ?? character.weapon}</div>
    </div>

    <div class="sheet-section">
      <div class="sheet-section-title">Attributes</div>
      <div class="sheet-stats">
        ${Object.entries(character.stats).map(([key, val]) => `
          <div class="sheet-stat">
            <span class="sheet-stat-name">${STAT_LABELS[key]}</span>
            <span class="sheet-stat-dots">${renderDots(val)}</span>
            <span class="sheet-stat-val">${val}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="sheet-section">
      <div class="sheet-section-title">Resources</div>
      <div class="sheet-resources">
        <div class="sheet-resource health">
          <span class="res-label">Health</span>
          <span class="res-val">${resources.health}<span class="res-max">/10</span></span>
        </div>
        <div class="sheet-resource coin">
          <span class="res-label">Coin</span>
          <span class="res-val">${resources.coin}</span>
        </div>
        <div class="sheet-resource reputation">
          <span class="res-label">Reputation</span>
          <span class="res-val">${resources.reputation}<span class="res-max">/10</span></span>
        </div>
      </div>
    </div>

    <div class="sheet-section sheet-alignment">
      <div class="sheet-section-title">Alignment</div>
      <div class="alignment-label">${alignmentLabel}</div>
      <div class="alignment-track">
        <div class="alignment-fill" style="width:${(resources.honour / 20) * 100}%"></div>
      </div>
      <div class="alignment-ends">
        <span>Infamy</span><span>Honour</span>
      </div>
    </div>

    ${(workAvailable || worked) ? `
    <div class="sheet-section">
      <button class="work-btn${worked ? ' work-done' : ''}" id="work-btn" ${worked ? 'disabled' : ''}>
        ${worked ? 'Work done for now' : `Find work &nbsp;+${coinAmount} coin`}
      </button>
    </div>
    ` : ''}

    ${state.history.length > 0 ? `
    <div class="sheet-section sheet-history-section">
      <button class="history-toggle-btn" id="history-toggle-btn">
        ${historyOpen ? 'Close Journal ▲' : 'Open Journal ▼'}
      </button>
      ${historyOpen ? renderHistoryHTML(state.history) : ''}
    </div>
    ` : ''}
  `;

  // Re-attach event listeners after innerHTML rebuild
  const workBtn = el.querySelector('#work-btn');
  if (workBtn && !worked) {
    workBtn.addEventListener('click', () => doWork(), { once: true });
  }

  const historyBtn = el.querySelector('#history-toggle-btn');
  if (historyBtn) {
    historyBtn.addEventListener('click', () => {
      historyOpen = !historyOpen;
      renderCharacterSheet(getState());
    });
  }
}

function renderHistoryHTML(history) {
  if (!history.length) return '';
  return `
    <div class="history-log">
      ${history.map(h => {
        const beat = BEATS.find(b => b.id === h.beat);
        const outcomeLabel = h.outcome === 'success' ? 'Success' : h.outcome === 'failure' ? 'Failure' : 'Neutral';
        return `
          <div class="history-entry">
            <div class="history-beat-name">${beat?.name ?? `Beat ${h.beat}`}</div>
            <div class="history-choice">→ ${h.choiceLabel ?? h.choice} <span class="history-outcome history-outcome-${h.outcome}">${outcomeLabel}</span></div>
            ${h.summary ? `<div class="history-summary">${h.summary}</div>` : ''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderDots(val) {
  const max = 9;
  let out = '';
  for (let i = 1; i <= max; i++) {
    out += `<span class="dot ${i <= val ? 'dot-filled' : ''}">${i <= val ? '◆' : '◇'}</span>`;
  }
  return out;
}

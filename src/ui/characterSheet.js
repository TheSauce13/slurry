import { getAlignmentLabel } from '../character/alignment.js';

const STAT_LABELS = {
  brawn: 'Brawn',
  graft: 'Graft',
  wit:   'Wit',
  brass: 'Brass',
  guts:  'Guts',
  lurk:  'Lurk',
};

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

  el.innerHTML = `
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

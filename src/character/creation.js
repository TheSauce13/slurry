import { STAT_MIN, STAT_MAX, STAT_BUDGET, COIN_BY_OCCUPATION, PAST_DECISION_EFFECTS } from '../state/defaults.js';
import { setState, getState } from '../state/gameState.js';

// Re-export so main.js can import from one place
export { getState };

const STAT_NAMES = ['brawn', 'graft', 'wit', 'brass', 'guts', 'lurk'];

// Current stat values during allocation
const stats = { brawn: 2, graft: 2, wit: 2, brass: 2, guts: 2, lurk: 2 };

function totalPoints() {
  return Object.values(stats).reduce((s, v) => s + v, 0);
}

function remaining() {
  return STAT_BUDGET - totalPoints();
}

function updatePointsDisplay() {
  const rem = remaining();
  const el = document.getElementById('points-remaining');
  el.textContent = rem;
  el.className = rem === 0 ? 'exact' : rem < 0 ? 'over' : '';

  const warning = document.getElementById('points-warning');
  warning.classList.toggle('hidden', rem === 0);

  document.getElementById('submit-btn').disabled = rem !== 0;

  // Update button states for each stat row
  for (const stat of STAT_NAMES) {
    const row = document.querySelector(`.stat-row[data-stat="${stat}"]`);
    if (!row) continue;
    const val = stats[stat];
    row.querySelector('.stat-dec').disabled = val <= STAT_MIN;
    row.querySelector('.stat-inc').disabled = val >= STAT_MAX || rem <= 0;
    row.classList.toggle('maxed', val === STAT_MAX);
    row.classList.toggle('mined', val === STAT_MIN);
    row.querySelector('.stat-value').textContent = val;
  }
}

export function initCreationForm() {
  // Wire stat +/- buttons
  for (const stat of STAT_NAMES) {
    const row = document.querySelector(`.stat-row[data-stat="${stat}"]`);
    if (!row) continue;

    row.querySelector('.stat-dec').addEventListener('click', () => {
      if (stats[stat] > STAT_MIN) { stats[stat]--; updatePointsDisplay(); }
    });

    row.querySelector('.stat-inc').addEventListener('click', () => {
      if (stats[stat] < STAT_MAX && remaining() > 0) { stats[stat]++; updatePointsDisplay(); }
    });
  }

  // Initial render
  updatePointsDisplay();

  // Form submission
  document.getElementById('creation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (remaining() !== 0) return;

    const name         = document.getElementById('char-name').value.trim();
    const origin       = document.getElementById('char-origin').value;
    const occupation   = document.getElementById('char-occupation').value;
    const weapon       = document.getElementById('char-weapon').value;
    const pastDecision = document.getElementById('char-past').value;

    if (!name || !origin || !occupation || !weapon || !pastDecision) {
      // Browser validation handles required fields, but belt-and-braces
      alert('Please complete all fields before registering.');
      return;
    }

    const effects = PAST_DECISION_EFFECTS[pastDecision];
    const finalStats = { ...stats };

    // Apply past-decision stat bonus (cap at STAT_MAX + 1 = 9 max)
    if (effects.statBonus) {
      finalStats[effects.statBonus] = Math.min(finalStats[effects.statBonus] + 1, 9);
    }

    const newState = {
      character: {
        name,
        origin,
        occupation,
        weapon,
        pastDecision,
        stats: finalStats,
      },
      resources: {
        health:     10,
        coin:       COIN_BY_OCCUPATION[occupation] ?? 3,
        reputation: 5,
        honour:     effects.honour,
      },
      flags: {
        beat2Ally:          false,
        beat3Item:          null,
        tollmasterRelation: null,
      },
      progress: {
        chapter:  1,
        beat:     0,
        complete: false,
      },
      history: [],
    };

    setState(newState);
    console.log('=== SLURRY — Game State ===');
    console.log(JSON.stringify(newState, null, 2));

    onCharacterCreated(newState);
  });
}

// Callback — wired up in main.js
let onCharacterCreated = () => {};
export function setOnCharacterCreated(fn) { onCharacterCreated = fn; }

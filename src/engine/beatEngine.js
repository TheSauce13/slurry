import { BEATS } from './beats.js';
import { getAvailableOptions } from './options.js';
import { applyEffects, applyCost } from './consequence.js';
import { statCheck } from '../utils/dice.js';
import { generateBeatProse, generateConsequenceProse, generateChapterSummary } from './narrator.js';
import { getState, updateState } from '../state/gameState.js';
import {
  renderNarrative,
  renderConsequence,
  renderCheckResult,
  renderChapterEnd,
  showLoading,
  hideLoading,
} from '../ui/renderer.js';
import { renderChoices, clearChoices } from '../ui/choicePanel.js';

export async function startChapter() {
  await runBeat(1);
}

export async function runBeat(beatId) {
  const beat = BEATS.find(b => b.id === beatId);
  if (!beat) return;

  updateState({ progress: { beat: beatId } });

  // Fetch AI prose (with loading state), fall back to hardcoded
  showLoading();
  const aiProse = await generateBeatProse(beat, getState());
  hideLoading();

  const paragraphs = aiProse
    ? splitParagraphs(aiProse)
    : beat.prose;

  await renderNarrative(paragraphs, beat.name);

  const options = getAvailableOptions(beat, getState());
  renderChoices(options, beat.prompt, (chosen) => onChoiceMade(beat, chosen));
}

async function onChoiceMade(beat, option) {
  clearChoices();
  applyCost(option.cost);

  // Stat check
  let checkResult = null;
  let outcome;

  if (option.checks?.length) {
    const state = getState();
    const bestStat = Math.max(...option.checks.map(s => state.character.stats[s] ?? 0));
    const repModifier = Math.floor((state.resources.reputation - 5) / 3);
    checkResult = statCheck(bestStat, repModifier);
    outcome = checkResult.success ? option.success : option.failure;

    console.log(
      `[Beat ${beat.id}] "${option.label}" — stat ${bestStat}+${repModifier} mod, ` +
      `roll ${checkResult.roll} → ${checkResult.success ? 'SUCCESS' : 'FAILURE'}`
    );
  } else {
    outcome = { prose: option.prose, effects: option.effects };
    console.log(`[Beat ${beat.id}] "${option.label}" — neutral outcome`);
  }

  applyEffects(outcome.effects);

  updateState({
    history: [
      ...getState().history,
      {
        beat: beat.id,
        choice: option.id,
        outcome: checkResult
          ? (checkResult.success ? 'success' : 'failure')
          : 'neutral',
      },
    ],
  });

  if (checkResult) await renderCheckResult(checkResult.success);

  // Fetch AI consequence prose, fall back to hardcoded
  showLoading();
  const aiConsequence = await generateConsequenceProse(beat, option, checkResult, getState());
  hideLoading();

  await renderConsequence(aiConsequence ?? outcome.prose);

  const nextId = beat.id + 1;
  if (nextId <= 5) {
    showContinue(() => runBeat(nextId));
  } else {
    showContinue(async () => {
      showLoading();
      const summary = await generateChapterSummary(getState());
      hideLoading();
      renderChapterEnd(getState(), summary);
    });
  }
}

function showContinue(onContinue) {
  const pane = document.getElementById('narrative-pane');
  const btn = document.createElement('button');
  btn.className = 'continue-btn';
  btn.textContent = getState().progress.beat < 5 ? 'Continue →' : 'End of Chapter I →';
  btn.addEventListener('click', () => { btn.remove(); onContinue(); }, { once: true });
  pane.appendChild(btn);
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
  requestAnimationFrame(() => requestAnimationFrame(() => btn.classList.add('visible')));
}

function splitParagraphs(text) {
  return text
    .split(/\n\n+/)
    .map(p => p.replace(/\n/g, ' ').trim())
    .filter(Boolean);
}

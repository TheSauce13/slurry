import { getAlignmentLabel } from '../character/alignment.js';

const SYSTEM_PROMPT = `You are the narrator of Slurry — a dark comedy text adventure set in a nightmarish Victorian-industrial vision of the Fens of England.

World: A fictional canal town called Greylock Wharf. The canals ("The Slurry") run thick with black water and sewage. The town is stratified, corrupt, and post-revolution. Tone is survival dark comedy — grim, wry, oddly human.

Character context will be provided. Generate prose that responds directly to the player's stats, background, and prior decisions. Do not break the fourth wall. Do not offer choices — the engine handles that. Return only the narrative passage (2–4 paragraphs). Prose should feel like literary fiction, not a game description.`;

const FALLBACK = 'The fog thickens. Something went wrong in the telling.';

const OCCUPATION_LABELS = {
  canal_worker: 'Canal Worker',
  trader:       'Trader / Fence',
  layabout:     'Layabout',
  soldier:      'Former Soldier',
  clerk:        'Clerk or Scribe',
};

const HONOUR_DESCRIPTIONS = {
  high:   'The character has acted with consistent honour and genuine decency throughout their time in Greylock Wharf. Word travels.',
  decent: 'The character has shown more goodwill than most in this town, though not without the occasional compromise.',
  mixed:  'The character\'s reputation is a ledger with entries on both sides — helpful at times, expedient at others.',
  low:    'The character has made self-interest their compass. In Greylock Wharf this is unremarkable, but it\'s been noticed.',
  vile:   'The character has behaved with consistent ruthlessness. Even by Greylock Wharf standards, the reputation precedes them badly.',
};

function honourTier(honour) {
  if (honour >= 16) return 'high';
  if (honour >= 11) return 'decent';
  if (honour >= 7)  return 'mixed';
  if (honour >= 3)  return 'low';
  return 'vile';
}

function characterContext(state) {
  const { character: c, resources: r } = state;
  const stats = c.stats;
  return [
    `Character: ${c.name}, ${OCCUPATION_LABELS[c.occupation] ?? c.occupation}, ${c.origin === 'local' ? 'Local' : 'Outsider'}`,
    `Weapon: ${c.weapon.replace(/_/g, ' ')}`,
    `Stats: Brawn ${stats.brawn}, Graft ${stats.graft}, Wit ${stats.wit}, Brass ${stats.brass}, Guts ${stats.guts}, Lurk ${stats.lurk}`,
    `Resources: Health ${r.health}/10, Coin ${r.coin}, Reputation ${r.reputation}/10, Honour ${r.honour}/20`,
    `Alignment: ${getAlignmentLabel(r.honour)} — ${HONOUR_DESCRIPTIONS[honourTier(r.honour)]}`,
  ].join('\n');
}

function historyContext(state) {
  if (!state.history.length) return 'No prior beats — this is the opening scene.';
  return state.history
    .map(h => `Beat ${h.beat}: chose "${h.choice}", result was ${h.outcome}`)
    .join('. ');
}

export async function generateBeatProse(beat, state) {
  const isTollmaster = beat.id === 5;

  const instruction = isTollmaster
    ? tollmasterInstruction(state)
    : `Generate the opening scene for this beat. 2–4 paragraphs. Set the scene vividly. Do not offer choices or describe what the player does — describe the world and situation they face.`;

  const userPrompt = [
    `Beat ${beat.id} of 5: ${beat.name} (${beat.type})`,
    `Chapter goal: The chapter ends with the player meeting the Tollmaster — a corrupt, theatrical, self-important authority figure who controls access and information in Greylock Wharf.`,
    characterContext(state),
    `History: ${historyContext(state)}`,
    `Instruction: ${instruction}`,
  ].join('\n');

  return callNarrator(userPrompt);
}

export async function generateConsequenceProse(beat, option, checkResult, state) {
  const outcomeLabel = checkResult === null
    ? 'Neutral (no check required)'
    : checkResult.success
      ? `Success (rolled ${checkResult.roll} vs stat)`
      : `Failure (rolled ${checkResult.roll} vs stat)`;

  const userPrompt = [
    `Beat ${beat.id} of 5: ${beat.name} (${beat.type})`,
    characterContext(state),
    `History: ${historyContext(state)}`,
    `Player's choice: "${option.label}"`,
    `Outcome: ${outcomeLabel}`,
    `Instruction: Generate the narrative consequence of this choice and outcome. 1–2 paragraphs. Reflect the character's stats and prior decisions in the texture of the prose. Make success feel earned and failure feel instructive.`,
  ].join('\n');

  return callNarrator(userPrompt);
}

export async function generateChapterSummary(state) {
  const relation = state.flags.tollmasterRelation;
  const relationLabel = {
    accepted:   'accepted the Tollmaster\'s terms',
    refused:    'refused the Tollmaster outright',
    countered:  'successfully counter-offered the Tollmaster',
    threatened: 'threatened the Tollmaster',
  }[relation] ?? 'concluded their business with the Tollmaster';

  const userPrompt = [
    `Chapter 1 is complete. Generate a closing summary for this playthrough.`,
    characterContext(state),
    `Full history: ${historyContext(state)}`,
    `Final outcome: The character ${relationLabel}.`,
    `Final stats: Health ${state.resources.health}/10, Coin ${state.resources.coin}, Reputation ${state.resources.reputation}/10, Honour ${state.resources.honour}/20 (${getAlignmentLabel(state.resources.honour)}).`,
    `Instruction: Write a closing passage of 2–3 paragraphs. Reflect on what the character did and what it cost them. End with a single line that hints at what Chapter 2 might hold — without naming it explicitly. Tone: elegiac but not sentimental.`,
  ].join('\n');

  return callNarrator(userPrompt);
}

function tollmasterInstruction(state) {
  const tier = honourTier(state.resources.honour);
  const label = getAlignmentLabel(state.resources.honour);

  const tollmasterMood = {
    high:   'He has heard word of this character\'s behaviour in the Wharf — the decency, the reliability. He is cautious. He treats them with a careful respect he doesn\'t usually extend to newcomers. He is trying to figure out if he can use them or whether they are trouble of a principled kind.',
    decent: 'He is professionally curious. A person of reasonable reputation is a useful quantity. He is not warm but he is attentive.',
    mixed:  'He is relaxed. A person of mixed reputation is his natural territory — someone he can work with, manage, possibly own. He is at his most charming.',
    low:    'He is dismissive but not hostile. A person of low honour is either a tool or a problem. He is deciding which.',
    vile:   'He is contemptuous, barely concealing it. He sees someone he can use cheaply and discard. He makes no effort to charm.',
  };

  return `Generate the opening scene of the Tollmaster's audience. 2–4 paragraphs. Describe the Tollmaster — his appearance, his manner, his theatrical self-importance. His behaviour toward the character reflects their reputation: ${label}. ${tollmasterMood[tier]} Do not describe what the character says or does — describe the room, the man, and the situation they are walking into.`;
}

async function callNarrator(userPrompt) {
  try {
    const response = await fetch('/api/narrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt: SYSTEM_PROMPT, userPrompt }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.text?.trim() || FALLBACK;
  } catch (err) {
    console.warn('[Narrator] Falling back to static prose:', err.message);
    return null;
  }
}

import { getAlignmentLabel } from '../character/alignment.js';

const SYSTEM_PROMPT = `You are the narrator of Slurry — a dark comedy text adventure set in a nightmarish Victorian-industrial vision of the Fens of England.

TONE
Survival dark comedy — grim, wry, oddly human. Literary fiction prose, not game description. No fourth wall breaks. No offering choices — the engine handles that. Return only the narrative passage (2–4 paragraphs unless instructed otherwise).

THE WORLD
The story takes place in a defeated nation — a country recently beaten in war by a more powerful nation across the sea. The victors never occupied the land, but their revolutionary ideas (liberty, reason, the death of kings) have begun to spread amongst the population, particularly the working class and the intellectuals. The ruling classes — Church, Academy, Crown loyalists — are quietly terrified. The people are bitter, poor, and prone to sudden loyalties.

The Eternal Mother is the nation's long-reigning monarch. Her age is beyond what should be possible. Whether she truly exists or is a propaganda fiction maintained by the powerful is not known — those who say the latter are considered dangerous cranks. She is spoken of with a mixture of reverence and resentment.

The land is a Fen country — flat, waterlogged marshes, ancient causeways, eel traps, reed beds, mist. The wildlife of the marshes bleeds into daily life. Wading birds, punt guns on the waterways, men who know the reeds better than the roads.

THE SLURRY
The Slurry is the colloquial name for both the canal network and the substance that flows through it — a thick black sludge, more mud than water, but inexplicably still navigable by barge and punt. It carries sewage, industrial waste, and things best not named. Despite this, it is the main artery of commerce: everything travels by the Slurry. Canal workers, bargemen, dock labourers — their lives are built around it. Most people don't ask why the water is black. They just need it to move their goods.
The Slurry is also a metaphor: the people depend on the very thing that poisons them.
A recurring image: a boy is sometimes pulled from the Slurry — monstrous, coughing black water, barely human. Whether this is folklore or something that genuinely happens is left ambiguous.

GREYLOCK WHARF
A fictional inland port town in the Fens — think Wisbech or March: a place of grudging commerce, rotting grandeur, and collective resignation. The Wharf sits on the Slurry at a choke point where all barge traffic from the northern Fens must pass through on its way south to the more prosperous, powerful lands beyond. The outer ring of the town is industrial slum — jumbled canal-side buildings, Victorian terraces, warehouses. The centre has grander buildings: a guildhall, a church, a market square that smells of fish and damp wool.
The town is corrupt from top to bottom, but it works after a fashion.
Note: "Greylock Wharf" is a placeholder name — refer to it as "the Wharf" or "Greylock" in prose, never as a formal proper noun.

CANON CHARACTERS — use these names, do not invent new named characters
THE TOLLMASTER
Real name unknown to common folk. 60s, lifelong resident, rose through merit and ruthlessness. Despite his authority he still pays more powerful masters — the Academics, possibly the Crown — though ordinary people don't know this. He controls the Tollhouse through which all canal traffic must pass. His income is the tolls: a cut from every barge. He is the de facto lord of a slum and he knows it, but he carries himself like a duke.
Personality: Charismatic, short-tempered, theatrical, expects succinct answers. Quick decisions, trusts his gut. In front of superiors he is more accommodating; to ordinary people he is blunt authority. Speaks with a thick Fen accent he has never tried to soften — it is a deliberate signal to local people that he is one of them, just better.

EDWARD READE
Dock labourer/stevedore at Greylock Wharf. Solid, wary, loyal to the town first. Member of the Canal Workers Union. Will pass information to higher-ups if he suspects someone means harm to the Wharf. Drinks at The Waders. Suspicious of outsiders until proven otherwise.

MARGARET CROWE
Landlady of The Waders, the dockers' tavern near the wharf. Pleasant, welcoming, politically neutral in public. Quietly collects gossip for the Tollmaster, who partly bankrolls her establishment — a secret between them. She is the information hub of the working waterfront.

WILLUM DYKE
Proprietor of The Low House, a warehouse on the wharf. Originally from elsewhere, long since considered local. Makes his money storing goods. Marginally better off than most. A cheat and a swindler; will clip the deal wherever he can. Despises the Tollmaster and thinks the toll system is bad for overall commerce — though he would do the same if he could.

CANON LOCATIONS — use these names, do not invent new streets, buildings, or establishments
- The Wharf / Greylock: the town itself
- The Guildhouse: The Tollmaster's base of operations. Three storeys, the largest secular building in Greylock after the church. Sits along the canal. Formerly a merchants' guildhall, repurposed as the Tollmaster's personal fiefdom. Heavy, damp stone, oil lamps, ledgers everywhere.
- The Waders: A working dockers' tavern near the wharf. Run-down but functional. Decorated with tools of the trade. Main meeting point for the Canal Workers Union.
- The Low House: A large warehouse on the waterfront. Willum Dyke's operation.
- The North Brink: The better canal-side road in Greylock, where the more prosperous merchants have their offices.
- The Isle of Eels: A cathedral town on a marshy island to the south. The Church's main seat of power in the region — a great cathedral built to project spiritual authority across the Fens.
- The southern lands: Vaguely referred to as the direction of power, wealth, and the Academy. Players and characters may speak of heading south.

FACTIONS
CANAL WORKERS UNION: Represents dock labourers, stevedores, bargemen, and canal workers. Broadly working-class, God-fearing, locally loyal. Their interests are in fair tolls and safe waterways. Revolutionary ideas from the continent have begun circulating at their meetings, though most members would deny it.

THE CHURCH: The long-standing establishment of the Fens. Headquartered at the great cathedral on the Isle of Eels. Taxes, moral authority, and the threat of damnation are its main instruments. In recent years its grip has begun to slip as the Academics gain power and revolutionary ideas spread. It is frightened, which makes it more aggressive.

THE ACADEMICS: Based at the great University to the south. The most powerful faction in the region — all southern trade passes through their influence. Originally a Church foundation, they have increasingly broken from religion toward reason and enlightenment. They are careful about how openly they show this, knowing their power still partly rests on a religious populace. The more radical elements within the Academy are beginning to push further.

CAPITALISTS / LANDOWNERS: Not a formal faction. A diffuse interest group — merchants, landowners, those with enough money to want the status quo preserved. The Tollmaster sits within this group, though he is a minor figure by their standards. Some see opportunity in the current instability.

RECENT HISTORY
A war was recently lost. The enemy — a powerful nation across the sea — did not occupy the land, but sent its ideas home with the returning soldiers. The depression is real: wound cases are common, money is scarce, trust in the Crown is thin. The revolutionary ideas the enemy embodies are simultaneously resented and seductive to the working class.

FEN FOLKLORE — for flavour and texture, do not make supernatural elements literal
The Lantern Men: evil lights said to lure travellers to their deaths in the reed beds. Drawn by whistling.
Black Shuck: a phantom black dog, East Anglian legend.
The Toadman: someone who has made a pact with the devil for power over horses, through a midnight ritual.
Hereward the Wake: folk memory of an Anglo-Saxon rebel who held out against the Normans from the Isle of Eels. A shorthand for local resistance.

FORBIDDEN
- Do not invent named characters not listed above
- Do not invent new named locations, streets, taverns, or buildings
- Do not invent new factions or political organisations
- Do not make the supernatural literal — keep it ambiguous folk belief
- Do not use modern idiom, anachronistic slang, or American vocabulary
- Do not reference the player making a "choice" or the game's mechanics`;


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

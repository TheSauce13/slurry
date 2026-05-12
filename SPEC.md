# Slurry: A Text Adventure — Technical Specification

## Project Overview

Slurry is an AI-powered browser-based text adventure with RPG elements, set in a nightmarish vision of Britain inspired by the Fens of Cambridgeshire. The world is defined by decaying canals, industrial squalor, Victorian moral hypocrisy, political strife, and dark comedy. The canals — "The Slurry" — are thick with black mud, running through a fictional market town reminiscent of Wisbech, March or Chatteris in atmosphere.

The game generates its narrative dynamically using the Anthropic API, ensuring every player's journey through the world feels unique and responds to their character's stats, choices, and alignment. However, the underlying story structure is fixed — all players move through the same chapter beats, making playthroughs comparable while the texture of each is entirely their own.

**Core Loop:**
1. Player completes character creation (name, stats, background, weapon of choice)
2. Chapter opens with an AI-generated scene-setting passage
3. Player is presented with a decision at each beat (5 per chapter)
4. Claude generates the narrative consequence of the choice, shaped by player stats and prior decisions
5. Player's character sheet, resource trackers, and moral alignment update accordingly
6. Chapter ends with a summary and a hook into Chapter 2

**Key Design Principles:**
- Every piece of narrative prose is AI-generated at runtime — no static story text
- Fixed structural beats ensure replayability and comparability between players
- Player stats influence narrative tone and available options (soft and hard gating)
- Moral alignment (Honour/Infamy) tracked throughout like Red Dead Redemption
- Browser-first — designed to be a portfolio piece and shareable demo
- Visual aesthetic: Victorian/industrial typewriter terminal, aged paper and ink

---

## Project Folder Structure

```
slurry/
├── .env                          # Environment variables (gitignored)
├── .env.example                  # Template for required env vars
├── .gitignore
├── package.json
├── README.md
├── SPEC.md                       # This file
│
├── public/
│   ├── index.html                # Entry point
│   ├── style.css                 # Terminal/typewriter aesthetic styles
│   └── assets/
│       └── fonts/                # Period-appropriate typeface files
│
├── src/
│   ├── main.js                   # App entry point, state initialisation
│   │
│   ├── state/
│   │   ├── gameState.js          # Central game state object and mutation helpers
│   │   └── defaults.js           # Default stat values, starting resources
│   │
│   ├── character/
│   │   ├── creation.js           # Character creation form logic
│   │   ├── stats.js              # Stat definitions, modifiers, skill checks
│   │   └── alignment.js          # Honour/Infamy tracking and tier labels
│   │
│   ├── engine/
│   │   ├── narrator.js           # Anthropic API calls — scene generation
│   │   ├── beats.js              # Chapter 1 beat definitions (structure, context)
│   │   ├── options.js            # Decision option generation and stat gating
│   │   └── consequence.js        # Post-choice state mutation logic
│   │
│   ├── ui/
│   │   ├── renderer.js           # DOM manipulation, typewriter effect
│   │   ├── characterSheet.js     # Stat card render and update
│   │   ├── choicePanel.js        # Render decision options, handle click
│   │   └── resourceBar.js        # Health, coin, reputation display
│   │
│   └── utils/
│       ├── typewriter.js         # Typewriter text animation utility
│       ├── dice.js               # Stat check / dice roll helpers
│       └── storage.js            # localStorage save/load (future)
│
└── tests/                        # Future: unit tests for stat logic
    └── .gitkeep
```

---

## Environment Variables

```bash
# Anthropic API
ANTHROPIC_API_KEY=               # Your Anthropic API key

# App Settings
NODE_ENV=development
```

`.env.example` should be committed with blank values.

---

## World & Tone Reference (Slurry Bible Summary)

The following is the canonical world context injected into every Anthropic prompt as a system message:

**Setting:** A fictional Fen market town — grim, waterlogged, reeking of industry and rot. The canals ("The Slurry") run thick with black mud and waste. Jumbled Victorian slum buildings line the banks. Grand civic buildings — guildhall, church, customs house — loom at the town centre, half-collapsed or repurposed.

**Tone:** Survival dark comedy. Think *Gangs of New York* filtered through a British sensibility — grim, absurd, oddly noble. Characters are worn down but wry. Catastrophe is met with tutting and a cup of tea.

**Society:** Rigidly stratified. Canal workers, immigrants, and criminals at the bottom. Merchants and guild bosses in the middle. Academics, clergy, and political figures at the top. All of them corrupt in their own way.

**Politics:** Post-upheaval. Something like a revolution happened — or a war was lost — and the town is still shaking out the consequences. Factions contest control of the canals, the guildhall, and public opinion. Pub philosophy, broadsheet editorials, and anonymous pamphlets are the media of the day.

**The Boy:** Recurring motif — a figure pulled from the Slurry, coughing black water. Not the player, but a symbol of the world's tendency to dredge up the unwanted.

---

## Character Creation

Character creation is presented as a Victorian-styled questionnaire — a "Registration of Person" form. Each answer generates both mechanical stats and narrative flavour used by the AI narrator throughout.

### Stats (Classic RPG, 1–10 scale)

| Stat | Description |
|---|---|
| **Brawn** | Physical strength, intimidation, heavy labour |
| **Graft** | Dexterity, sleight of hand, tools and craft |
| **Wit** | Intelligence, reading, persuasion through reason |
| **Brass** | Charisma, social confidence, charm and bluster |
| **Guts** | Courage, resilience, resistance to fear or pain |
| **Lurk** | Stealth, awareness, knowing when to stay quiet |

Players allocate 30 points across 6 stats (min 2, max 8 at creation).

### Background Questions (Shape narrative, not just stats)

These are presented as form questions and feed into the AI narrator's understanding of the character:

1. **Origin** — *"Are you from these parts, or did the road bring you here?"*
   - Local (grants social context, knows faces and places)
   - Outsider (grants independence, unknown quantity, slight mistrust)

2. **Occupation** — *"How have you kept yourself fed?"*
   - Canal Worker / Bargeman
   - Trader / Fence
   - Layabout / Opportunist
   - Former Soldier
   - Clerk or Scribe

3. **Weapon of Choice** — *"What do you keep close when the night turns ugly?"*
   - Fists (Brawn-based, brutal, zero subtlety)
   - Knife (Graft-based, fast, concealable)
   - Cosh / Club (Brawn + Guts hybrid)
   - Silver Tongue (Brass-based, no weapon — talk your way out)
   - Something Improvised (wildcard, Wit-based)

4. **A Past Decision** — *"There's something on your conscience. What is it?"*
   - "I left someone behind to save myself." (low Honour start, +Guts)
   - "I gave away something I needed to someone worse off." (high Honour start, +Brass)
   - "I took credit for something I didn't do." (neutral, +Wit)
   - "I've done nothing worth confessing. Yet." (neutral baseline)

### Resources (Tracked throughout)

| Resource | Starting Value | Description |
|---|---|---|
| **Health** | 10 | Physical wellbeing. Zero = unconscious/dead |
| **Coin** | Variable by occupation | Money, barter capacity |
| **Reputation** | 5 | How the town sees you. Affects Brass checks |
| **Honour/Infamy** | Variable by past | Moral alignment score (0 = pure villain, 20 = righteous) |

---

## Chapter 1: Structure & Beats

**Chapter Title:** *"A Town Like Any Other"*

**Chapter Summary:** The player arrives at or wakes up in the Fen town of **Greylock Wharf** (fictional). Word has reached them — or they've stumbled into it — that the town's de facto authority figure, a man known as **The Tollmaster** (a kind of corrupt mayor/town crier hybrid), wants to see new faces registered and assessed. Getting to him, and surviving that meeting, is the business of Chapter 1.

The Tollmaster serves as the world's introduction: he's pompous, self-serving, and oddly charismatic. He knows the factions, the grudges, and the lay of the land — and he'll tell you some of it, for a price.

### The Five Beats

Each beat is a **fixed structural moment** — Claude generates the prose and option flavour, but the decision type and stakes are predefined.

---

**Beat 1: Arrival / Orientation**

*Type: World-building + first impression*

The player's opening scene. AI generates a description of Greylock Wharf based on character background (local vs outsider). The town is introduced — the stench of the Slurry, the noise of the docks, the watchful eyes.

Decision: *How do you enter the situation?*
- Push through openly (Brawn / Brass check)
- Observe before moving (Lurk / Wit check)
- Find someone to talk to (Brass / Wit check)
- Options may vary based on Origin background

*Consequence feeds:* Reputation ±1, sets tone of AI narrator for this playthrough

---

**Beat 2: Complication — Someone Wants Something**

*Type: Social encounter / light conflict*

A figure accosts the player — a debt collector, a desperate canal worker, a suspicious constable, or a child running a scam. The AI generates the encounter based on player stats and Beat 1 outcome.

Decision: *How do you handle this person?*
- Threaten or intimidate (Brawn / Guts check)
- Negotiate or barter (Brass / Coin cost)
- Deceive or misdirect (Wit / Lurk check)
- Help them genuinely (Honour +1, possible Coin cost)

*Consequence feeds:* Honour/Infamy ±1–2, Coin ±, minor ally or enemy flag set

---

**Beat 3: The Slurry Moment**

*Type: Environmental / survival beat — signature world moment*

Something goes wrong near the canal. A barge incident, someone in the water, a confrontation on a bridge, contraband spotted. The Slurry itself is present — oozing, black, ominous. This beat always involves a physical or moral risk.

Decision: *What do you do?*
- Physical intervention (Brawn / Guts check — risk of injury)
- Clever intervention (Wit / Graft check)
- Walk away (Honour -2, safe passage)
- Call for help (Brass check, Reputation variable)

*Consequence feeds:* Health ±, Honour/Infamy ±2, possible item gain (salvaged from the Slurry)

---

**Beat 4: The Tollmaster's Threshold**

*Type: Gatekeeper encounter — social/political*

The player reaches the Tollmaster's hall (the old guildhall, repurposed as his personal fiefdom). They must get past his secretary/enforcer to gain an audience. This beat introduces the political layer of the world.

Decision: *How do you get in?*
- Talk your way past (Brass check, Reputation modifier)
- Bribe your way in (Coin cost)
- Sneak or find another entrance (Lurk / Graft check)
- Use a contact from Beat 2 (only if ally flag set)

*Consequence feeds:* Sets tone of Tollmaster meeting, Coin ±

---

**Beat 5: The Audience**

*Type: Major character encounter — chapter climax*

The Tollmaster receives the player. He is theatrical, manipulative, and informative. The AI generates his personality and monologue based on the player's stat profile and accumulated Honour/Infamy. He makes an offer, a demand, or an observation — and the player must respond.

Decision: *How do you leave this meeting?*
- Accept his terms (neutral path — sets up faction alliance)
- Refuse outright (Honour/Infamy dependent — could be noble or foolish)
- Counter-offer (Wit / Brass check — best outcome if successful)
- Threaten him (Brawn / Guts check — high risk, high reward)

*Consequence feeds:* Major faction flag set, Reputation ±2, Chapter 1 summary generated

---

## Anthropic API — Narrative Generation

All story prose is generated via the Anthropic API at runtime. Claude Code should use `claude-sonnet-4-20250514`.

### System Prompt (injected on every call)

```
You are the narrator of Slurry — a dark comedy text adventure set in a nightmarish Victorian-industrial vision of the Fens of England. 

World: A fictional canal town called Greylock Wharf. The canals ("The Slurry") run thick with black water and sewage. The town is stratified, corrupt, and post-revolution. Tone is survival dark comedy — grim, wry, oddly human.

Character context will be provided. Generate prose that responds directly to the player's stats, background, and prior decisions. Do not break the fourth wall. Do not offer choices — the engine handles that. Return only the narrative passage (2–4 paragraphs). Prose should feel like literary fiction, not a game description.
```

### Per-Call User Prompt Structure

```
Beat: [beat name and type]
Character: [name], [occupation], [origin]
Stats: Brawn [n], Graft [n], Wit [n], Brass [n], Guts [n], Lurk [n]
Resources: Health [n], Coin [n], Reputation [n], Honour [n]
Previous beat outcome: [1-sentence summary]
Player's choice this beat: [chosen option]
Instruction: Generate the narrative consequence of this choice. Reflect the character's stats and prior decisions in the texture of the prose.
```

### Response Handling

- Extract `content[0].text` from response
- Feed through typewriter renderer
- On error, display a flavourful fallback: *"The fog thickens. Something went wrong in the telling."*

---

## UI & Visual Design

### Aesthetic Brief

Victorian/industrial terminal. Think a compositor's proof press, a telegram office, or a broadsheet print room. Not a computer — more like a mechanical document.

**Palette:**
- Background: near-black (`#0d0b08`)
- Text: aged cream/yellow (`#e8dfc0`)
- Accent: rust red (`#8b2a2a`) for health, alerts, faction markers
- Secondary accent: tarnished brass (`#b5802a`) for coin and stats
- Canal black: `#1a1a1a` for the Slurry motif elements

**Typography:**
- Body: `Special Elite` or `Courier Prime` (Google Fonts)
- Headers: `UnifrakturMaguntia` or similar blackletter for chapter titles

**Interactions:**
- All text renders via typewriter effect (character by character)
- Choices fade in after passage completes
- Stat card lives in a sidebar — updates animate with a brief flicker
- No images in v1 — atmosphere via text and CSS texture

### Layout

```
┌─────────────────────────────┬──────────────────┐
│                             │  CHARACTER SHEET  │
│   NARRATIVE PANE            │  ─────────────    │
│   (scrolling, typewriter)   │  Name / Origin    │
│                             │  Stats block      │
│                             │  Resources        │
│                             │  Alignment meter  │
│   ─────────────────         │                   │
│   [ Choice A ]              │                   │
│   [ Choice B ]              │                   │
│   [ Choice C ]              │                   │
└─────────────────────────────┴──────────────────┘
```

Mobile: stack vertically, character sheet collapses to icon bar.

---

## Ralph Loop Build Plan

This project is built one loop at a time. Each loop has a single clear goal, a definition of done, and should be completable in one focused Claude Code session. SPEC.md is the source of truth — update it if scope changes.

---

### Loop 1: Scaffold & Character Creation Form
**Goal:** Working HTML/CSS/JS scaffold with character creation UI

**Deliverables:**
- Repo initialised with folder structure above
- `index.html` renders character creation form
- Form captures: name, stat allocation (30 points, 6 stats), origin, occupation, weapon, past decision
- Stat point counter updates live — cannot submit if over/under 30
- Victorian aesthetic applied: palette, fonts, layout
- On submit, `gameState.js` populated with character object
- Console log confirms state shape is correct

**Validation:**
- ✅ Form renders correctly in Chrome
- ✅ Stat allocation enforces 30-point budget
- ✅ All fields required before submission
- ✅ Game state object logged on submit with correct shape

---

### Loop 2: Character Sheet UI & Resource Display
**Goal:** Persistent character sheet sidebar renders and reflects state

**Deliverables:**
- Character sheet renders in sidebar from game state
- Stats displayed as labelled values (not bars — period aesthetic)
- Resources (Health, Coin, Reputation, Honour) displayed with labels
- Alignment shown as a descriptive label (e.g. "Known Scoundrel", "Decent Sort", "Upright Citizen")
- Sheet updates reactively when state mutates
- Typewriter utility built and working on a test string

**Validation:**
- ✅ Sheet renders from mock state object
- ✅ Updating state triggers visible UI change
- ✅ Alignment label changes across the range
- ✅ Typewriter effect works on a paragraph of text

---

### Loop 3: Beat Engine & Static First Beat
**Goal:** Beat 1 (Arrival) runs with hardcoded prose and real choices

**Deliverables:**
- `beats.js` defines all 5 Chapter 1 beats as data objects (context, decision type, options, consequence schema)
- `renderer.js` renders beat narrative and choice buttons
- Beat 1 prose hardcoded (placeholder — real AI in Loop 5)
- Clicking a choice logs the selection and advances state
- Choice panel clears after selection; consequence text appears (hardcoded placeholder)
- Beat counter advances

**Validation:**
- ✅ Beat 1 narrative renders with typewriter effect
- ✅ Three choices render as buttons after text completes
- ✅ Clicking a choice logs selection to console
- ✅ Consequence placeholder text appears
- ✅ Beat counter increments

---

### Loop 4: Stat Checks & Consequence Logic
**Goal:** Choices trigger real stat checks and mutate game state

**Deliverables:**
- `dice.js` implements stat check: roll d10, succeed if ≤ stat value (with modifiers)
- `consequence.js` reads choice + check result → updates Health, Coin, Reputation, Honour
- Beat 1 consequence logic fully implemented with real state mutations
- Character sheet reflects changes after each beat
- Beat 2 and Beat 3 consequence logic implemented (hardcoded prose still)

**Validation:**
- ✅ Stat checks produce pass/fail correctly against stat values
- ✅ State mutations apply correctly (Health deducted, Coin changes, etc.)
- ✅ Honour/Infamy score changes based on moral choices
- ✅ Character sheet updates visibly after consequences

---

### Loop 5: Anthropic API Integration — Live Narrative
**Goal:** Beat prose and consequences generated live by Claude

**Deliverables:**
- `narrator.js` built — calls Anthropic API with system prompt + per-beat user prompt
- Beat 1 narrative generated live from character state
- Consequence text for Beat 1 generated live based on choice + stat check result
- Typewriter renders streamed or full response
- Error handling: graceful fallback text if API fails
- `.env` and `.env.example` set up

**Validation:**
- ✅ API call returns narrative prose for Beat 1
- ✅ Prose reflects player's name, origin, and stats
- ✅ Consequence prose differs between pass and fail outcomes
- ✅ Error fallback displays without crash
- ✅ API key never appears in client-side code

---

### Loop 6: All 5 Beats Live
**Goal:** Full Chapter 1 playable start to finish with AI narrative

**Deliverables:**
- All 5 beats wired to Anthropic API
- Beat 4 (Threshold) checks ally flag from Beat 2 — extra option if set
- Beat 5 (Tollmaster) generates unique character based on player's Honour/Infamy
- Chapter end: summary screen generated by AI reviewing the full playthrough
- "Chapter Complete" state with chapter summary and stat snapshot

**Validation:**
- ✅ All 5 beats render AI narrative without errors
- ✅ Beat 4 conditional option appears only if ally flag set
- ✅ Tollmaster's personality visibly differs for high vs low Honour players
- ✅ Chapter summary generates correctly
- ✅ Full playthrough completable in one session

---

### Loop 7: Polish & Portfolio Readiness
**Goal:** Game is shareable, looks good, performs correctly

**Deliverables:**
- Responsive layout (mobile stacked, desktop side-by-side)
- Loading state ("The fog rolls in...") while API responds
- Chapter title card animation on game start
- README with setup instructions and project description
- Deployed to Railway (Express server: serves `dist/` + `/api/narrate` proxy)
- Shareable URL tested end-to-end

**Validation:**
- ✅ Game loads and plays on mobile Chrome
- ✅ Loading states present on all API calls
- ✅ Deployed URL accessible without local setup
- ✅ README explains project clearly for portfolio context

---

### Loop 8: Narrative Grounding — Prose, Location & World Fidelity
**Goal:** Fix the three issues that don't require architectural change: over-written prose, beat location jumping, and real-world references bleeding in.

**Deliverables:**
- Prose style rules added to system prompt: plain declarative sentences, no similes, favour the specific and concrete
- Beat location metadata added to `beats.js` — each beat has a `location` field
- Beat prompt explicitly states where the character is coming from and where they are now
- Forbidden list expanded: no real nation names, cities, historical figures, or cultural proper nouns. Foreign revolutionary nation referred to only as "the Republic" or "across the sea"
- System prompt note that the country itself is unnamed

**Validation:**
- ✅ Prose does not open with a simile
- ✅ Beat 3 prose is set in the correct location, not the Guildhouse
- ✅ A character with a foreign-sounding name does not trigger references to real nations

---

### Loop 9: AI-Generated Choice Labels
**Goal:** Replace hardcoded choice button labels with labels generated by the AI, so choices are always responsive to what was just narrated.

**Deliverables:**
- Beat prose API call returns structured JSON: `{ prose: string, choices: [{ label: string, id: string }] }` where `id` maps each AI label back to a pre-defined mechanical option in `beats.js`
- `beatEngine.js` updated to parse structured response and match AI labels to mechanics
- Fallback to static labels if JSON parse fails or id mapping fails
- Choice labels feel like they belong to the scene just narrated

**Validation:**
- ✅ Choice labels change between playthroughs of the same beat
- ✅ No choice references an event that hasn't happened yet in the current run
- ✅ Fallback static labels load silently if AI response is malformed

---

### Loop 10: Beat Summary Memory
**Goal:** Give the AI a compact factual memory of what has happened so it doesn't contradict prior beats or repeat encounters.

**Deliverables:**
- After each beat consequence resolves, generate a 1–2 sentence canonical summary: who was met, where, what happened, what was decided
- Summaries stored in `state.history` alongside existing outcome data
- Summaries passed to the AI in all subsequent beat and consequence prompts
- History context in `narrator.js` updated to use summaries rather than bare outcome labels

**Validation:**
- ✅ Beat 4 prose does not send the character to meet an NPC they already encountered in Beat 2
- ✅ Beat 5 (Tollmaster) prose reflects events from earlier beats
- ✅ History context in prompt stays under ~300 tokens by Beat 5

---

## Future Loops (Post-Chapter 1)

| Loop | Goal |
|---|---|
| Loop 11 | Chapter 2 beats — deeper faction system, Tollmaster consequences |
| Loop 12 | Persistent save via localStorage — resume across sessions |
| Loop 13 | AI-generated character portrait using image API |
| Loop 14 | Faction reputation system — separate tracks for 3+ factions |
| Loop 15 | Multiple endings to Chapter 1 based on accumulated state |
| Loop 16 | Broadsheet interstitials — flavour text between chapters mimicking a newspaper |

---

## Technical Notes

### State Shape

```javascript
{
  character: {
    name: String,
    origin: "local" | "outsider",
    occupation: String,
    weapon: String,
    pastDecision: String,
    stats: {
      brawn: Number,   // 2–8
      graft: Number,
      wit: Number,
      brass: Number,
      guts: Number,
      lurk: Number
    }
  },
  resources: {
    health: Number,     // 0–10
    coin: Number,
    reputation: Number, // 0–10
    honour: Number      // 0–20
  },
  flags: {
    beat2Ally: Boolean,
    beat3Item: String | null,
    tollmasterRelation: "accepted" | "refused" | "countered" | "threatened" | null
  },
  progress: {
    chapter: 1,
    beat: 0,            // 0 = character creation, 1–5 = beats
    complete: Boolean
  },
  history: [            // One entry per beat for AI context
    { beat: Number, choice: String, outcome: String }
  ]
}
```

### Anthropic API Model

Use `claude-sonnet-4-20250514` — do not use Haiku (quality too low for literary prose) or Opus (cost too high for a demo). Max tokens: 600 per narrative call.

### Stat Check Mechanic

```javascript
// Roll d10 (1–10). Success if roll <= stat value.
// Modifier from Reputation, Honour, or situational context can adjust stat temporarily.
function statCheck(statValue, modifier = 0) {
  const roll = Math.ceil(Math.random() * 10);
  return roll <= (statValue + modifier);
}
```

### Honour/Infamy Labels

| Score | Label |
|---|---|
| 18–20 | Righteous Soul |
| 14–17 | Decent Sort |
| 10–13 | Mixed Reputation |
| 6–9 | Known Scoundrel |
| 2–5 | Villain of the Parish |
| 0–1 | Beyond Redemption |

---

## Success Metrics

**Loops 1–4 (Foundation):**
- ✅ Character creation functional and visually on-brand
- ✅ All stat checks and consequence logic working
- ✅ Character sheet updates correctly throughout

**Loop 5–6 (AI Narrative):**
- ✅ AI prose feels genuinely responsive to character choices
- ✅ Two playthroughs with different characters produce noticeably different text
- ✅ Tollmaster encounter feels like a real character, not a form

**Loop 7 (Portfolio):**
- ✅ Playable at a public URL in under 30 seconds
- ✅ Looks distinctive — not generic AI demo aesthetic
- ✅ Shareable to LinkedIn / portfolio without explanation needed

---

## Dependencies

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.x"
  },
  "devDependencies": {
    "vite": "^5.x"
  }
}
```

Minimal dependencies by design. Vanilla JS + Vite for bundling. No React — the DOM manipulation is simple enough and the terminal aesthetic suits direct manipulation.

---

## License & Ownership

Personal project — Tom Harper. Not for commercial use without permission.

---

**Document Version:** 1.1
**Last Updated:** 2026-04-28
**Author:** Tom Harper
**Status:** Loops 1–5 complete. See playtest notes below.

---

## Playtest Notes — Loop 5 (AI Narrative)

Observations from first full playthrough (Brian Farts, Former Soldier, high Brawn). These feed directly into Loops 6–8 scope.

---

### What's Working

- Opening scene prose is genuinely strong — atmospheric, character-specific, funny in the right ways (dead dog in christening bonnet)
- The war backstory for a Former Soldier character reads naturally into the world tone
- Cost per full playthrough: ~10 cents at `claude-opus-4-5` (manageable for dev, needs attention at scale)

---

### Issue 1: The AI Invents Its Own World

**Problem:** Without a constrained world bible in the prompt, Claude invents characters, gangs, locations and plotlines that contradict each other across beats. Examples from playtest:
- Characters invented: Nell Croup, Mickle Sarn, Alderman Cretch, Alderman Crake, Sergeant Mellick
- Gangs invented: The Grinders
- Locations invented: The Sow's Ear, the Tanner's Quarter, Coldharbour Lock, the Assembly Hall
- New plotlines: labour uprising, stolen shipping manifests, rum-smuggling culvert

These are sometimes good on their own but generate a completely different story each beat with no continuity.

**Fix (Loop 6):** Expand the world bible section of the system prompt with:
- Canon named characters (Tollmaster, any named constables, tavern owners, dock foremen) with brief bios
- Canon locations (guild hall, Sluice Street, the bridge, the docks — mapped consistently)
- Canon factions (Canal Guild, Reformers, Merchant Assembly — defined in SPEC, not invented live)
- Explicit instruction: *"Do not invent named characters, gangs, or locations not listed below. Use the names provided."*

---

### Issue 2: The Choices Don't Match the Generated Story

**Problem:** The choice buttons are hardcoded to the original beat structure (e.g. "Save the boy in the Slurry") but the AI has generated a completely different scenario (being chased down an alley). The disconnect makes the game feel broken.

**Fix (Loop 6):** The beat opening prompt must explicitly tell Claude what situation the scene needs to **end in** — so the hardcoded choices always make sense. Example:

```
Instruction: Generate the opening scene for Beat 3. The scene MUST end with the player 
facing a situation near the canal where someone is in danger in the water. 
The following choices will be offered: [Go in after him / Find something to reach him with / 
Walk away / Shout for help]. Write toward these options.
```

Alternatively, generate the choices dynamically per run — but that's a bigger architectural change (Loop 8+).

---

### Issue 3: Narrative Drift and No Story Arc

**Problem:** The AI doesn't know that Beat 5 must arrive at the Tollmaster's office for a specific meeting. Each beat drifts further from the fixed story structure until Beat 5 has to awkwardly snap back, introducing the Tollmaster cold with no setup.

**Fix (Loop 6):** Each beat prompt should include:
- Where this beat fits in the overall chapter arc ("This is beat 3 of 5")
- What the chapter is building toward ("The chapter ends with a meeting with the Tollmaster, the town's corrupt authority figure")
- What the previous beat established (from history array — already captured, just not being used fully)

---

### Issue 4: Repetition of Imagery

**Problem:** Phrases and images repeat across beats — "rendered fat", "tallow", crowds parting, shoulder-set descriptions of physicality. The model doesn't know what it already wrote.

**Fix (Loop 6):** Pass a brief summary of imagery already used in the system prompt, or in a new field: `"Avoid repeating: rendered fat, tallow, crowds parting before protagonist"`. Build this from the history array.

---

### Issue 5: Cost at Scale

**Problem:** ~10 cents per playthrough at `claude-opus-4-5`. At 5 API calls per chapter × future chapters, this adds up quickly for a public demo.

**Options to evaluate (Loop 7):**
- Downgrade opening prose to `claude-haiku-4-5` (cheap, fast) and keep consequences on `claude-sonnet-4-5`
- Add Anthropic **prompt caching** — the system prompt + world bible is identical on every call and qualifies for cache (saves ~90% on input tokens for repeat calls)
- Reduce `max_tokens` from 600 to 400 for consequence calls (they don't need as much room)
- Benchmark quality difference between Sonnet and Opus for this specific task — Sonnet may be sufficient

---

### Issue 6: World Bible Needed in SPEC

**Action:** Before Loop 6 begins, expand SPEC.md with:

1. **Named canon characters** — The Tollmaster (full name, personality notes, appearance), at least 2–3 recurring minor characters with names, occupations, and attitudes
2. **Canon locations** — Named streets, key buildings, the bridge, the docks, 2–3 named drinking establishments
3. **Canon factions** — The three factions mentioned in the world brief (Canal Guild, Reformers, Merchant Assembly) each need a 2-sentence description
4. **Forbidden invention clause** in the system prompt — Claude must not name new characters, gangs or locations beyond what's provided

This world bible section feeds directly into `narrator.js` system prompt expansion in Loop 6.

---

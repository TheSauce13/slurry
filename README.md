# Slurry
### A Text Adventure of the Fens

A browser-based AI text adventure set in a nightmarish Victorian-industrial vision of Cambridgeshire. Every piece of narrative prose is generated live by Claude (Anthropic), shaped by your character's stats, background choices, and the decisions you make.

Built as a portfolio piece.

---

## Premise

You arrive in **Greylock Wharf** — a fictional Fen market town of rotting grandeur, thick canals, and Victorian moral hypocrisy. The canals ("The Slurry") run thick with black water and waste. The town is stratified, corrupt, and still shaking out the consequences of something like a revolution. 

Your goal: survive Chapter I, reach the Tollmaster, and leave with your reputation — and ideally your health — intact.

---

## How to Play (Local)

```bash
git clone <repo>
cd slurry
npm install
cp .env.example .env
# Add your Anthropic API key to .env
npm run dev
# Open http://localhost:3456
```

Requires an [Anthropic API key](https://console.anthropic.com).

---

## Deploy to Railway

1. Push to GitHub
2. Create a new project on [Railway](https://railway.app) and connect the repo
3. Add `ANTHROPIC_API_KEY` to **Variables** in the Railway dashboard
4. Railway auto-detects `railway.toml` — build and start commands are pre-configured

The Express server in `server.js` builds the Vite frontend, serves it as static files, and handles the `/api/narrate` proxy — keeping the API key server-side with no separate backend needed.

---

## How It Works

```
Character creation
       ↓
Beat 1–5 (fixed story structure)
       ↓                    ↓
 AI-generated         Stat checks
 opening prose        (d10 vs stat)
       ↓                    ↓
 Player choice       AI-generated
                     consequence prose
       ↓
 State mutations (Health, Coin, Reputation, Honour)
       ↓
 AI chapter summary
```

**Every narrative call includes:** character name, occupation, origin, all six stats, resources, alignment tier, and the full decision history of the current playthrough. Two players with different characters get completely different prose for the same structural beat.

---

## Design

- **No static story text** — all prose generated at runtime by `claude-opus-4-5`
- **Fixed structural beats** — same 5 story moments per chapter, making runs comparable
- **Honour/Infamy** tracked like Red Dead Redemption — affects the Tollmaster's behaviour in Beat 5
- **Stat checks** — d10 roll vs relevant stat, success/failure changes the consequence prose
- **Graceful fallback** — if the API fails, hardcoded prose loads silently

---

## Stack

| | |
|---|---|
| Frontend | Vanilla JS, Vite |
| Styles | CSS custom properties, no framework |
| Fonts | Special Elite, UnifrakturMaguntia (Google Fonts) |
| AI | Anthropic Claude (`claude-opus-4-5`) |
| Hosting | Netlify (static + serverless function) |

---

## Project Structure

```
src/
  engine/       Beat definitions, stat checks, narrator API calls
  character/    Stats, alignment, creation form logic
  state/        Central game state + reactive subscriptions
  ui/           Renderer, character sheet, choice panel
  utils/        Typewriter, dice, storage
netlify/
  functions/    Serverless API proxy (keeps key server-side)
```

---

*Personal project — Tom Harper. Not for commercial use without permission.*

import { getState, updateState } from '../state/gameState.js';

// Apply an effects object to game state, clamping all values to valid ranges.
export function applyEffects(effects) {
  if (!effects || !Object.keys(effects).length) return;

  const state = getState();
  const resPatch = {};
  const flagPatch = {};

  if (effects.health !== undefined)
    resPatch.health = Math.max(0, Math.min(10, state.resources.health + effects.health));

  if (effects.coin !== undefined)
    resPatch.coin = Math.max(0, state.resources.coin + effects.coin);

  if (effects.reputation !== undefined)
    resPatch.reputation = Math.max(0, Math.min(10, state.resources.reputation + effects.reputation));

  if (effects.honour !== undefined)
    resPatch.honour = Math.max(0, Math.min(20, state.resources.honour + effects.honour));

  if (effects.flag)
    Object.assign(flagPatch, effects.flag);

  if (effects.tollmasterRelation !== undefined)
    flagPatch.tollmasterRelation = effects.tollmasterRelation;

  const patch = {};
  if (Object.keys(resPatch).length) patch.resources = resPatch;
  if (Object.keys(flagPatch).length) patch.flags = flagPatch;

  if (Object.keys(patch).length) updateState(patch);
}

// Deduct a cost object (e.g. { coin: 2 }) before a check resolves.
export function applyCost(cost) {
  if (!cost) return;
  applyEffects({
    coin: cost.coin !== undefined ? -cost.coin : undefined,
    health: cost.health !== undefined ? -cost.health : undefined,
  });
}

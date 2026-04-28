import { defaultGameState } from './defaults.js';

let state = defaultGameState();
const listeners = new Set();

export function getState() {
  return state;
}

export function setState(newState) {
  state = newState;
  notify();
}

export function updateState(partial) {
  state = deepMerge(state, partial);
  notify();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  for (const fn of listeners) fn(state);
}

function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

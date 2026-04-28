// localStorage save/load — Loop 9
export function saveGame(state) {
  localStorage.setItem('slurry_save', JSON.stringify(state));
}

export function loadGame() {
  const raw = localStorage.getItem('slurry_save');
  return raw ? JSON.parse(raw) : null;
}

export function clearSave() {
  localStorage.removeItem('slurry_save');
}

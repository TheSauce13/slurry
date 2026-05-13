import { getState, updateState } from '../state/gameState.js';

const WORK_LINES = {
  canal_worker: [
    'You spend an hour shifting sacking on the dock. Hard work, damp hands. The foreman pays without looking at you.',
    'A barge needs unloading and you have two arms. The work is grim. The coin is real.',
    'You help pull a flatboat clear of a silted inlet. Nobody thanks you. They do pay you.',
  ],
  trader: [
    'You spot goods in one hand and a buyer in the other and insert yourself between them. Standard practice.',
    'A man is selling something he doesn\'t know the value of. You help him understand it, and yourself.',
    'Two merchants need a neutral party to verify a weight. You are neutral enough for the purpose.',
  ],
  layabout: [
    'You find a job that needed doing before anyone specified what quality meant. It gets done.',
    'A crate needs watching for an hour. Nobody asks your credentials for watching.',
    'Someone needs a message run and doesn\'t want to be seen doing it themselves. You are seen all the time.',
  ],
  soldier: [
    'A nervous merchant needs a face with history behind it stood beside him for half an hour. You stand.',
    'You break up a dock altercation before it became a dock incident. The grateful party pays.',
    'A warehouse owner needs someone who looks like they\'ve been in rooms that ended badly. You qualify.',
  ],
  clerk: [
    'A dock foreman needs a manifest checked. You run your eye over it and find three errors. He pays for two of them.',
    'A trader needs a letter written that doesn\'t sound like a threat while functioning as one. Standard correspondence.',
    'Someone needs their accounts in order before a meeting they\'re nervous about. You put them in order.',
  ],
};

const COIN_BY_OCCUPATION = {
  canal_worker: 2,
  trader:       2,
  layabout:     1,
  soldier:      2,
  clerk:        1,
};

export function canWork(state) {
  return state.progress.beat >= 1 &&
         state.progress.beat <= 4 &&
         !state.progress.complete &&
         !state.flags.workedThisBeat;
}

export function workCoinAmount(state) {
  return COIN_BY_OCCUPATION[state.character.occupation] ?? 1;
}

export function doWork() {
  const state = getState();
  const occupation = state.character.occupation;
  const lines = WORK_LINES[occupation] ?? WORK_LINES.layabout;
  const line = lines[Math.floor(Math.random() * lines.length)];
  const coin = COIN_BY_OCCUPATION[occupation] ?? 1;

  updateState({
    resources:  { coin: state.resources.coin + coin },
    flags:      { workedThisBeat: true },
  });

  // Brief narrative toast in the pane
  const pane = document.getElementById('narrative-pane');
  if (pane) {
    const toast = document.createElement('div');
    toast.className = 'work-toast';
    toast.innerHTML = `<span class="work-line">${line}</span><span class="work-coin">+${coin} coin</span>`;
    pane.appendChild(toast);
    pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
    setTimeout(() => toast.classList.add('work-toast-fade'), 2800);
    setTimeout(() => toast.remove(), 3600);
  }
}

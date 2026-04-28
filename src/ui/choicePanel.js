let choiceContainer = null;

export function renderChoices(options, prompt, onSelect) {
  const pane = document.getElementById('narrative-pane');

  choiceContainer = document.createElement('div');
  choiceContainer.className = 'choice-panel';

  const promptEl = document.createElement('div');
  promptEl.className = 'choice-prompt';
  promptEl.textContent = prompt;
  choiceContainer.appendChild(promptEl);

  const list = document.createElement('div');
  list.className = 'choice-list';

  options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.dataset.id = option.id;

    const label = document.createElement('span');
    label.className = 'choice-label';
    label.textContent = option.label;

    btn.appendChild(label);

    if (option.cost?.coin) {
      const cost = document.createElement('span');
      cost.className = 'choice-cost';
      cost.textContent = `${option.cost.coin} coin`;
      btn.appendChild(cost);
    }

    // Stagger fade-in
    btn.style.animationDelay = `${i * 120}ms`;

    btn.addEventListener('click', () => {
      list.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
      btn.classList.add('chosen');
      setTimeout(() => onSelect(option), 300);
    }, { once: true });

    list.appendChild(btn);
  });

  choiceContainer.appendChild(list);
  pane.appendChild(choiceContainer);
  pane.scrollTo({ top: pane.scrollHeight, behavior: 'smooth' });
}

export function clearChoices() {
  if (choiceContainer) {
    choiceContainer.classList.add('choices-dismissed');
    setTimeout(() => choiceContainer?.remove(), 400);
    choiceContainer = null;
  }
}

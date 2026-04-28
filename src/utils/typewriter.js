// Renders text character-by-character into a DOM element. Returns a Promise.
export function typewrite(el, text, speed = 18) {
  return new Promise((resolve) => {
    el.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, speed);
      } else {
        resolve();
      }
    };
    tick();
  });
}

// Animate shuriken float entrance
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.anime-char-card').forEach((el, idx) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'scale(1.07) translateY(-9px)';
      setTimeout(() => {
        el.style.transform = '';
      }, 300);
    }, 400 + idx * 190);
  });
});

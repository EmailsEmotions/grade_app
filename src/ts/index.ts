import '../scss/index.scss';
import '../html/index.html';

import '../icon/Logo64.png';
import '../icon/Logo32.png';
import '../icon/Logo16.png';

// Constant for iOS
// const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

const WindowAction = {
  loaded() {
    this.resized();
  },

  resized() {
    // Make landing fit on mobile screens
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },
};

window.addEventListener('load', () => {
  WindowAction.loaded();
});

window.addEventListener('resize', () => {
  WindowAction.resized();
});

import '../scss/index.scss';
import '../html/index.html';

import '../icon/Logo64.png';
import '../icon/Logo32.png';
import '../icon/Logo16.png';

import { SectionManager } from './section-manager';
import { TextSection } from './sections/text-section';
import { GradeSection } from './sections/grade-section';

// Constant for iOS
// const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

class App {
  constructor() {
    const sectionManager = new SectionManager();
    const textSection = new TextSection(sectionManager);
    const gradeSection = new GradeSection(sectionManager);
  }
}

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

let app = null;

window.addEventListener('load', () => {
  WindowAction.loaded();
  app = new App();
});

window.addEventListener('resize', () => {
  WindowAction.resized();
});

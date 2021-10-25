import '../scss/index.scss';
import '../html/index.html';

import '../icon/Logo64.png';
import '../icon/Logo32.png';
import '../icon/Logo16.png';

import { SectionManager } from './section-manager';
import { TextSection } from './sections/text-section';
import { GradeSection } from './sections/grade-section';
import { HelpDialog } from './dialog';

// Constant for iOS
// const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

class App {
  private sectionManager: SectionManager;
  private textSection: TextSection;
  private gradeSection: GradeSection;

  constructor() {
    new HelpDialog();

    this.sectionManager = new SectionManager();
    this.textSection = new TextSection(this.sectionManager);
    this.gradeSection = new GradeSection(this.sectionManager);

    this.sectionManager.addTextSection(this.textSection);
    this.sectionManager.addGradeSection(this.gradeSection);

    this.sectionManager.init();
  }
}

const WindowAction = {
  loaded() {
    this.resized();
    this.registerServiceWorker();
  },

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('../sw.js');
    }
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

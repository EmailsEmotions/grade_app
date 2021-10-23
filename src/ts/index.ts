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
  private sectionManager: SectionManager;
  private textSection: TextSection;
  private gradeSection: GradeSection;

  constructor() {
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

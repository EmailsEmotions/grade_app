import { clss } from './utils';

export class SectionManager {
  private gradingShown = false;

  constructor() {
    this.assignListeners();
  }

  public showGrading() {
    this.gradingShown = true;
    clss('grade-section')[0].setAttribute('name', 'active');
  }

  public hideGrading() {
    this.gradingShown = false;
    clss('grade-section')[0].removeAttribute('name');
  }

  private assignListeners() {
    window.addEventListener('keydown', (ev) => {
      if (ev.code === 'KeyS') {
        this.gradingShown ? this.hideGrading() : this.showGrading();
      }
    });
  }
}

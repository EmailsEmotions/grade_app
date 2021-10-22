import { SectionManager } from '../section-manager';
import { id } from '../utils';

export class TextSection {
  private parent: SectionManager;

  constructor(parent: SectionManager) {
    this.parent = parent;
    this.assignListeners();
  }

  assignListeners() {
    id('button-grade-text').addEventListener('click', () => {
      this.parent.showGrading();
    });
  }
}

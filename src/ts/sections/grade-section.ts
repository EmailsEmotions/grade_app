import { SectionManager } from '../section-manager';
import { id } from '../utils';

export class GradeSection {
  private parent: SectionManager;

  constructor(parent: SectionManager) {
    this.parent = parent;
    this.assignListeners();
  }

  assignListeners() {
    id('button-back-text').addEventListener('click', () => {
      this.parent.hideGrading();
    });
  }
}

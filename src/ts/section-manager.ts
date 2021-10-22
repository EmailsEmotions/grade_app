import { clss } from './utils';

export class SectionManager {
  constructor() {}

  public showGrading() {
    clss('grade-section')[0].setAttribute('name', 'active');
  }

  public hideGrading() {
    clss('grade-section')[0].removeAttribute('name');
  }
}

import { GradeSection } from './sections/grade-section';
import { TextSection } from './sections/text-section';
import { clss, id } from './utils';

export class SectionManager {
  public gradingShown = false;
  public canShowGrading = false;
  private textSection: TextSection;
  private gradeSection: GradeSection;

  constructor() {
    this.assignListeners();
  }

  public init() {
    this.setGrading(false);
    this.textSection
      .getText()
      .then(() => {
        this.setGrading(true);
      })
      .catch((err) => {
        alert('Nie udało się wczytać tekstu, spróbuj ponownie');
      });
  }

  public addTextSection(textSection: TextSection) {
    this.textSection = textSection;
  }

  public addGradeSection(gradeSection: GradeSection) {
    this.gradeSection = gradeSection;
  }

  public setGrading(value: boolean) {
    this.canShowGrading = value;

    if (value) {
      id('button-grade-text').classList.remove('btn-disabled');
      id('button-grade-text').classList.add('btn-primary');
    } else {
      id('button-grade-text').classList.remove('btn-primary');
      id('button-grade-text').classList.add('btn-disabled');
    }
  }

  public showGrading() {
    if (this.canShowGrading) {
      this.gradingShown = true;
      clss('grade-section')[0].setAttribute('name', 'active');
    }
  }

  public hideGrading() {
    this.gradingShown = false;
    clss('grade-section')[0].removeAttribute('name');
  }

  public restart() {
    this.gradeSection.restart();
    this.setGrading(false);
    this.textSection
      .getText()
      .then(() => {
        this.setGrading(true);
      })
      .catch((err) => {
        alert('Nie udało się wczytać tekstu, spróbuj ponownie');
      });
  }

  private assignListeners() {
    window.addEventListener('keydown', (ev) => {
      if (ev.code === 'KeyS') {
        this.gradingShown ? this.hideGrading() : this.showGrading();
      }
    });
  }
}

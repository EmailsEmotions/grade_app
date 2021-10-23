import { SectionManager } from '../section-manager';
import { id } from '../utils';

export class GradeSection {
  private parent: SectionManager;
  private currentlyGrading = 1;
  private loading = false;
  private grades = [null, null, null, null, null, null] as number[];

  constructor(parent: SectionManager) {
    this.parent = parent;
    this.assignListeners();

    this.checkArrows();
  }

  private canGoBack() {
    return this.currentlyGrading > 1;
  }

  private canGoNext() {
    return this.currentlyGrading < this.grades.length;
  }

  private checkArrows() {
    if (this.canGoBack()) {
      id('form-button-previous').removeAttribute('name');
    } else {
      id('form-button-previous').setAttribute('name', 'inactive');
    }

    if (this.canGoNext()) {
      id('form-button-next').removeAttribute('name');
    } else {
      id('form-button-next').setAttribute('name', 'inactive');
    }
  }

  private moveTo(which: number) {
    if (which <= 0 && which > this.grades.length) {
      return;
    }

    this.currentlyGrading = which;

    // Show all till `which`
    for (let i = 1; i <= which; i++) {
      id(`slide-${i}`).removeAttribute('name');
    }

    // Hide all after `which`
    const limit = this.grades.length;
    for (let i = which + 1; i <= limit; i++) {
      id(`slide-${i}`).setAttribute('name', 'hidden');
    }

    this.checkArrows();
  }

  private previous() {
    if (this.canGoBack()) {
      this.moveTo(this.currentlyGrading - 1);
    }
  }

  private next() {
    if (this.canGoNext()) {
      this.moveTo(this.currentlyGrading + 1);
    }
  }

  private checkSend() {
    const found = this.grades.findIndex((grade) => grade === null);

    // Found null
    if (found !== -1 || !this.parent.canShowGrading || this.loading) {
      id('button-send').classList.remove('btn-primary');
      id('button-send').classList.add('btn-disabled');
      return false;
    } else {
      id('button-send').classList.remove('btn-disabled');
      id('button-send').classList.add('btn-primary');

      return this.parent.canShowGrading;
    }
  }

  private send() {
    if (this.checkSend()) {
      this.loading = true;
      this.checkSend();
      return new Promise((resolve, reject) => {
        this.showLoading();

        const xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = () => {
          if (xmlHttp.readyState === 4) {
            this.hideLoading();
            this.loading = false;
            this.checkSend();

            if (xmlHttp.status === 200) {
              try {
                const json = JSON.parse(xmlHttp.responseText);
                this.parent.restart();
                this.checkSend();

                resolve(xmlHttp);
              } catch (e) {
                this.hideLoading();
                alert('Nie udało się wysłać oceny.');
                reject(xmlHttp);
              }
            } else {
              reject(xmlHttp);
            }
          }
        };

        xmlHttp.open('GET', 'https://damboy.sytes.net/ee/fakeSend.php');
        xmlHttp.send();
      });
    }
  }

  public restart() {
    this.moveTo(1);
    this.grades = [null, null, null, null, null, null];

    const limit = this.grades.length;
    for (let i = 1; i <= limit; i++) {
      const allGrades = id(`slide-${i}`).querySelectorAll('.grade-container');

      allGrades.forEach((grade: HTMLElement) => {
        grade.querySelector('div').removeAttribute('name');
      });
    }
  }

  private showLoading() {
    id('button-send-text').setAttribute('name', 'hidden');
    id('button-send-loading').removeAttribute('name');
  }

  private hideLoading() {
    id('button-send-text').removeAttribute('name');
    id('button-send-loading').setAttribute('name', 'hidden');
  }

  private handleGradeClick(
    which: number,
    allGrades: NodeListOf<Element>,
    clickedGrade: HTMLElement
  ) {
    if (this.loading || !this.parent.canShowGrading) {
      return;
    }
    // Clear selection
    allGrades.forEach((_grade) => {
      _grade.querySelector('div').removeAttribute('name');
    });

    // Set value
    this.grades[which - 1] = parseInt(clickedGrade.dataset.value);

    // Select circle
    clickedGrade.querySelector('div').setAttribute('name', 'active');

    // Check send
    this.checkSend();
  }

  private assignListeners() {
    id('button-back-text').addEventListener('click', () => {
      this.parent.hideGrading();
    });

    id('form-button-previous').addEventListener('click', () => {
      this.previous();
    });

    id('form-button-next').addEventListener('click', () => {
      this.next();
    });

    id('button-send').addEventListener('click', () => {
      this.send();
    });

    window.addEventListener('keydown', (ev) => {
      if (ev.code === 'ArrowLeft') {
        this.previous();
      }

      if (ev.code === 'ArrowRight') {
        this.next();
      }

      if (
        ev.code === 'Digit1' ||
        ev.code === 'Digit2' ||
        ev.code === 'Digit3'
      ) {
        const MAX_GRADES = 3;

        const allGrades = id(`slide-${this.currentlyGrading}`).querySelectorAll(
          '.grade-container'
        );

        const digit = parseInt(ev.code.substr(5));
        const elementIt = Math.abs(digit - MAX_GRADES);

        const grade = allGrades[elementIt] as HTMLElement;

        this.handleGradeClick(this.currentlyGrading, allGrades, grade);
      }

      if (ev.code === 'Enter') {
        this.send();
      }
    });

    window.addEventListener('keydown', (ev) => {});

    const limit = this.grades.length;
    for (let i = 1; i <= limit; i++) {
      const allGrades = id(`slide-${i}`).querySelectorAll('.grade-container');

      allGrades.forEach((grade: HTMLElement) => {
        grade.addEventListener('click', () => {
          this.handleGradeClick(i, allGrades, grade);
        });
      });
    }
  }
}

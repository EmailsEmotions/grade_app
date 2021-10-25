import { id } from './utils';

export class HelpDialog {
  private openned = false;
  private allowClose = true;

  constructor() {
    this.assignListeners();
  }

  open() {
    this.openned = true;
    id('help-dialog').setAttribute('name', 'shown');

    setTimeout(() => {
      id('help-dialog-content').setAttribute('name', 'shown');
    }, 100);
  }

  checkClose(force = false) {
    if (this.allowClose || force) {
      this.allowClose = true;
      this.close();
    } else {
      this.allowClose = true;
    }
  }

  close() {
    this.openned = false;
    id('help-dialog').removeAttribute('name');
    id('help-dialog-content').removeAttribute('name');
  }

  private assignListeners() {
    id('help-dialog').addEventListener('click', () => {
      this.checkClose();
    });

    id('help-dialog-content').addEventListener('click', () => {
      this.allowClose = false;
    });

    id('header-faq').addEventListener('click', () => {
      this.open();
    });

    id('help-dialog-close').addEventListener('click', () => {
      this.checkClose(true);
    });

    window.addEventListener('keydown', (ev) => {
      if (ev.code === 'KeyH') {
        if (this.openned) {
          this.checkClose(true);
        } else {
          this.open();
        }
      }
    });
  }
}

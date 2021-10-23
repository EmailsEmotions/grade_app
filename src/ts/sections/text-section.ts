import { SectionManager } from '../section-manager';
import { id } from '../utils';

export class TextSection {
  private parent: SectionManager;
  private text: string;
  private textId: string;

  constructor(parent: SectionManager) {
    this.parent = parent;
    this.assignListeners();
  }

  public getText() {
    return new Promise((resolve, reject) => {
      this.showLoading();
      const xmlHttp = new XMLHttpRequest();

      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
          this.hideLoading();

          if (xmlHttp.status === 200) {
            try {
              const json = JSON.parse(xmlHttp.responseText);

              this.text = json.text;
              this.textId = json.id;
              this.fill();

              resolve(xmlHttp);
            } catch (e) {
              this.hideLoading();
              reject(xmlHttp);
            }
          } else {
            reject(xmlHttp);
          }
        }
      };

      xmlHttp.open('GET', 'https://damboy.sytes.net/ee/fakeText.php');
      xmlHttp.send();
    });
  }

  private fill() {
    id('text-section-p').innerHTML = this.text;
  }

  private showLoading() {
    id('text-section-p').innerHTML = '';
    id('text-section-content')
      .getElementsByClassName('loading')[0]
      .removeAttribute('name');
  }

  private hideLoading() {
    id('text-section-content')
      .getElementsByClassName('loading')[0]
      .setAttribute('name', 'hidden');
  }

  private assignListeners() {
    id('button-grade-text').addEventListener('click', () => {
      this.parent.showGrading();
    });
  }
}

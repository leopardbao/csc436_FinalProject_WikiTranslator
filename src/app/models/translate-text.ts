
export class TranslateText {
  q: string;
  source: string = 'en';
  target: string ;
  format: string = 'text';

  constructor(content: string, target: string) {
    this.q = content;
    this.target = target;
  }
}
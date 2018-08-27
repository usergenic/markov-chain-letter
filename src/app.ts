import {SourceText} from './core/model';
import {GenerateOptions, SentenceGenerator} from './core/sentence-generator';

export class App {
  generator: SentenceGenerator;
  generateOptions: GenerateOptions;
  get sources(): SourceText[] {
    return this.generator.sources;
  }
  constructor() {
    this.generator = new SentenceGenerator();
    this.generateOptions = {};
  }
  generate() {
    this.generator.generateSentence(this.generateOptions);
  }
}

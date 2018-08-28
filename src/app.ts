import {SourceText} from './core/model';
import {NextTermIndex} from './core/next-term-index';
import {GenerateOptions, GenerateResult, SentenceGenerator} from './core/sentence-generator';

export class App {
  generator: SentenceGenerator;
  generateOptions: GenerateOptions;
  generateResult?: GenerateResult;

  get sources(): SourceText[] {
    return this.generator.sources;
  }
  constructor() {
    this.generator = new SentenceGenerator();
    this.generateOptions = {};
  }
  generate() {
    this.generateResult = this.generator.generate(this.generateOptions);
  }
}

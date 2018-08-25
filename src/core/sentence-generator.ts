import {Sentence, SourceText, Term} from './model';
import {NextTermIndex, Phrase} from './next-term-index';

export class SentenceGenerator {
  sources: SourceText[] = [];

  pick<T>(collection: T[], random: () => number): T {
    if (collection.length === 0) {
      throw new Error('Can not pick one of empty collection.');
    }
    return collection[Math.floor(collection.length * random())];
  }

  generate(options: GenerateOptions = {}): GenerateResult {
    const numSentences = options.numSentences || 1;
    const sentences = [];
    const errors = [];
    for (let s = 0; s < numSentences; ++s) {
      try {
        const sentence = this.generateSentence(options);
        sentences.push(sentence);
      } catch (error) {
        errors.push(error);
      }
    }
    return {sentences};
  }

  generateSentence(options: GenerateOptions = {}): GeneratedSentence {
    const minSources = options.minSources || 1;
    const maxSources = options.maxSources || this.sources.length;
    const mustStartWith = options.mustStartWith || '';
    const random = options.random || Math.random;
    const sentence: GeneratedSentence = [];
    const sources = this.sources.sort(() => this.pick([-1, 0, 1], random));
    let source;
    for (const candidateSource of sources) {
      if (candidateSource.nextTermIndex.hasPhrase(mustStartWith)) {
      }
    }
    return sentence;
  }
}

export interface GenerateOptions {
  numSentences?: number;
  minSources?: number;
  maxSources?: number;
  minRunLengthPerSource?: number;
  maxRunLengthPerSource?: number;
  minSentenceLength?: number;
  maxSentenceLength?: number;
  excludePhrases?: Phrase[];
  mustStartWith?: string;
  mustContain?: string;
  mustEndWith?: string;
  random?: typeof Math.random;
  retryLimit?: number;
}

export interface GenerateResult {
  sentences: GeneratedSentence[];
}

export type GeneratedSentence = GeneratedTerm[];

export interface GeneratedTerm {
  term: Term;
  sourceTextName: string;
}

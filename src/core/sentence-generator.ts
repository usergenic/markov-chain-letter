import {EOS, Sentence, SourceText, Term} from './model';
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

  generateSentence(options: GenerateOptions = {}, currentTry: number = 1):
      GeneratedSentence {
    const maxTries = options.maxTries || 1;
    const minSources = options.minSources || 1;
    const maxSources = options.maxSources || this.sources.length;
    const minSentenceLength = options.minSentenceLength || 5;
    const maxSentenceLength = options.maxSentenceLength || 1000;
    const minRunLengthPerSource = options.minRunLengthPerSource || 0;
    const maxRunLengthPerSource =
        options.minRunLengthPerSource || maxSentenceLength;
    const mustStartWith = options.mustStartWith || '';
    const excludePhrases = options.excludePhrases || [];
    const random = options.random || Math.random;
    const sentence: GeneratedSentence = [];
    let phrase = mustStartWith;
    let sources = this.sources.sort(() => this.pick([-1, 0, 1], random));
    let {source, terms} = this.findASourceToStartWith(phrase, sources);
    phrase.split(' ').forEach((term) => {
      sentence.push({term, sourceOptionName: 'mustStartWith'});
    });
    let currentSourceRunLength = 0;
    while (true) {
      try {
        const term = this.pick(terms, random);
        if (term === EOS) {
          const sentenceText = sentence.map((t) => t.term).join(' ').trim();
          if (sentence.length > maxSentenceLength) {
            throw new Error(`Generated sentence length ${
                sentence.length} exceeds maximum sentence length ${
                maxSentenceLength}.`);
          }
          excludePhrases.forEach((p) => {
            if (sentenceText.includes(p)) {
              throw new Error(
                  `Generated sentence includes an excluded phrase "${p}".`);
            }
          });
          return sentence;
        }
        ++currentSourceRunLength;
        sentence.push({term, sourceTextName: source.name});
        if (currentSourceRunLength >= maxRunLengthPerSource) {
          sources.push(sources.shift()!);
        }
        if (currentSourceRunLength > minRunLengthPerSource) {
          sources = sources.sort(() => this.pick([-1, 0, 1], random));
        }
        phrase = sentence.map((t) => t.term).join(' ').trim();
        const {source: newSource, terms: newTerms} =
            this.findASourceToStartWith(phrase, sources);
        if (source.name !== newSource.name) {
          currentSourceRunLength = 0;
          source = newSource;
        }
        terms = newTerms;
      } catch (error) {
        if (currentTry >= maxTries) {
          throw error;
        }
      }
    }
  }

  findASourceToStartWith(startWithPhrase: string, sources: SourceText[]):
      {source: SourceText, terms: Term[]} {
    for (const source of sources) {
      if (source.nextTermIndex!.hasPhrase(startWithPhrase)) {
        return {
          source,
          terms: source.nextTermIndex!.getNextTerms(startWithPhrase)
        };
      }
    }
    if (startWithPhrase) {
      return this.findASourceToStartWith(
          startWithPhrase.split(' ', 2).slice(1).join(' ').trim(), sources);
    }
    throw new Error(
        `Unable to find source text which can provide next term for start phrase "${
            startWithPhrase}"`);
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
  maxTries?: number;
}

export interface GenerateResult {
  sentences: GeneratedSentence[];
}

export type GeneratedSentence = GeneratedTerm[];

export interface GeneratedTerm {
  term: Term;
  sourceTextName?: string;
  sourceOptionName?: string;
}

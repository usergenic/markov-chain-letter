import {Sentence, Term} from './model';

export type Phrase = string;

export class NextTermIndex {
  maxPhraseLength = 2;
  nextTerms = new Map<Phrase, Term[]>();

  addSentence(sentence: Sentence) {
    sentence.forEach((term: Term, index: number) => {
      for (let phraseLength = 1;
           phraseLength <= this.maxPhraseLength && index - phraseLength >= 0;
           ++phraseLength) {
        const phrase = sentence.slice(index - phraseLength, index).join(' ');
        this.addNextTerm(phrase, term);
      }
    });
  }

  addNextTerm(phrase: Phrase, term: Term) {
    phrase = this.normalizePhrase(phrase);
    if (this.nextTerms.has(phrase)) {
      this.nextTerms.get(phrase)!.push(term);
    } else {
      this.nextTerms.set(phrase, [term]);
    }
  }

  getNextTerms(phrase: Phrase): Term[] {
    phrase = this.normalizePhrase(phrase);
    if (this.nextTerms.has(phrase)) {
      return this.nextTerms.get(phrase)!;
    }
    return [];
  }

  hasPhrase(phrase: Phrase): boolean {
    return this.nextTerms.has(this.normalizePhrase(phrase));
  }

  normalizePhrase(phrase: Phrase): string {
    return phrase.split(/\s+/)
        .slice(-this.maxPhraseLength)
        .join(' ')
        .toLowerCase()
        .replace(/[^a-z0-9 ]/, '-');
  }
}

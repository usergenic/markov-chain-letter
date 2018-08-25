import {Sentence, Term} from './model';

export class TextParser {
  isTerminal(term: Term, previousTerms: Term[], nextTerms: Term[]) {
    // Ends with a period, we'll assume it is not abbreviation if term is
    // greater than 4 characters.
    if (term.endsWith('.') && term.length > 4) {
      return true;
    }

    // Ends with a period, we'll assume it is not mid-sentence-abbreviation
    // if it is all caps and the next word is capitalized.
    if (term.endsWith('.') && term.toUpperCase() === term &&
        this.startsWithUpperCase(nextTerms[1])) {
      return true;
    }

    // Ends with a dot, not a capitalized word and the next word is capitalized.
    if (term.endsWith('.') && !this.startsWithUpperCase(term) &&
        this.startsWithUpperCase(nextTerms[1])) {
      return true;
    }

    // Ends with a period, the word is not capitalized
    // Ends with ," or ,) indicating quotation is not end of sentence.
    if (term.match(/,["\)]$/)) {
      return false;
    }

    // Ends with " is considered end of sentence if next word starts with
    // capital letter.
    if (term.match(/["\)]$/) && this.startsWithUpperCase(nextTerms[1])) {
      return true;
    }

    // Ends with other punctuation marks ! or ? always end of sentence.
    if (term.match(/[!\?]$/)) {
      return true;
    }

    return false;
  }

  parse(text: string): Sentence[] {
    const terms = text.split(/(\s+)/m);
    const sentences: Sentence[] = [];
    let sentence: Term[] = [];
    terms.forEach((term: Term, index: number) => {
      if (term.match(/^\s*$/m)) {
        return;
      }
      sentence.push(term);
      if (this.isTerminal(term, terms.slice(0, index), terms.slice(index))) {
        sentences.push(sentence);
        sentence = [];
      }
    });
    if (sentence.length > 0) {
      sentences.push(sentence);
    }
    return sentences;
  }

  startsWithUpperCase(term: Term): boolean {
    if (!term)
      return false;
    return term[0].toUpperCase() === term[0];
  }
}

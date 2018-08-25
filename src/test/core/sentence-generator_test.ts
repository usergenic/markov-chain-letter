import {assert} from 'chai';

import {SourceText} from '../../core/model';
import {NextTermIndex} from '../../core/next-term-index';
import {SentenceGenerator} from '../../core/sentence-generator';

describe('SentenceGenerator', () => {
  const quickBrownFox = {
    name: 'quick-brown-fox.txt',
    nextTermIndex: new NextTermIndex(),
  };
  ['The quick brown fox jumped over the lazy dog'].forEach(
      (s) => quickBrownFox.nextTermIndex.addSentence(s.split(' ')));

  const somewhereOverTheRainbow = {
    name: 'somewhere-over-the-rainbow.txt',
    nextTermIndex: new NextTermIndex(),
  };
  ['Somewhere over the rainbow, way up high'].forEach(
      (s) => somewhereOverTheRainbow.nextTermIndex.addSentence(s.split(' ')));

  describe('generateSentence', () => {
    it('should generate a sentence that starts with a given value', () => {
      const generator = new SentenceGenerator();
      generator.sources.push(quickBrownFox);
      generator.sources.push(somewhereOverTheRainbow);
      const sentence = generator.generateSentence(
          {random: () => 0.0, minRunLengthPerSource: 3});
      assert.deepEqual(
          sentence.map((s) => s.term).join(' ').trim(),
          'The quick brown fox jumped over the rainbow, way up high');
    });
  });
});

import {assert} from 'chai';

import {TextParser} from '../../core/text-parser';

describe('TextParser', () => {
  it('parses a string of text into expected sentences', () => {
    const parser = new TextParser();

    const sentences = parser.parse(`
        The quick brown fox jumped over
        the lazy dog. The lazy dog is
        lazy AF. Y'all are brutalizin'
        me. Dead men tell no tales!
      `);

    assert.deepEqual(sentences.map((s) => s.join(' ')), [
      'The quick brown fox jumped over the lazy dog.',
      'The lazy dog is lazy AF.',
      'Y\'all are brutalizin\' me.',
      'Dead men tell no tales!'
    ]);
  });
});

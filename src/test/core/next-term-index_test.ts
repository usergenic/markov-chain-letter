import {assert} from 'chai';

import {NextTermIndex} from '../../core/next-term-index';

describe('NextTermIndex', () => {
  it('returns next terms recorded for given precursor phrase', () => {
    const index = new NextTermIndex();
    index.maxPhraseLength = 3;
    index.addSentence('I like big tomatoes in my little salad.'.split(' '));
    const nextTerms = index.getNextTerms('big tomatoes in my');
    assert.deepEqual(nextTerms, ['little']);
  });
});

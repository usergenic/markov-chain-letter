import {NextTermIndex} from './next-term-index';

export type Term = string;
export type Sentence = Term[];

export interface SourceText {
  name: string;
  originalText?: string;
  nextTermIndex: NextTermIndex;
  attribution?: string;
}

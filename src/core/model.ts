import {NextTermIndex} from './next-term-index';

export const EOS = '';
export type Term = string;
export type Sentence = Term[];

export interface SourceText {
  name: string;
  originalText?: string;
  nextTermIndex?: NextTermIndex;
  order?: number;
  color?: string;
}

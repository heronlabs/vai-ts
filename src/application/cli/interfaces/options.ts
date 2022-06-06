import {Question} from './question/question';

export interface Options<Q> {
  getQuestions(): Question<Q>[];
}

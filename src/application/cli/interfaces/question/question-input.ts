import {QuestionType} from '../../enums/question-type';
import {Question} from './question';

export interface QuestionInput<T> extends Question<T> {
  type: QuestionType.INPUT;
  default: string;
}

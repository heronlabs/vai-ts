import {QuestionType} from '../../enums/question-type';
import {Question} from './question';

export interface QuestionConfirm<T> extends Question<T> {
  type: QuestionType.CONFIRM;
  default: boolean;
}

import {QuestionType} from '../../enums/question-type';

export interface Question<T> {
  name: T;
  message: string;
  type: QuestionType;
  default: string | boolean;
}

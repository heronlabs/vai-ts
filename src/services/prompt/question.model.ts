import {QuestionType} from './question.enum';

/**
 * Model for any Question to prompt.
 */
interface IQuestion<T> {
  name: T;
  message: string;
  type: QuestionType;
  default: string | boolean;
}

/**
 * Model for confirm Question to prompt.
 */
interface QuestionConfirm<T> extends IQuestion<T> {
  type: QuestionType.CONFIRM;
  default: boolean;
}

/**
 * Model for input Question to prompt.
 */
interface QuestionInput<T> extends IQuestion<T> {
  type: QuestionType.INPUT;
  default: string;
}

/**
 * Model for question.
 */
export type Question<T> = QuestionConfirm<T> | QuestionInput<T>;

import {Question} from './question.model';

/**
 * Interface for prompt questions and collect answers from prompt.
 */
export interface IPrompt {
  askQuestions<Q, A>(questions: Question<Q>[]): Promise<A>;
}

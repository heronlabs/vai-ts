import {IPrompt} from '../prompt.interface';
import {Question} from '../question.model';
import inquirer = require('inquirer');

/**
 * Implement prompt for ask questions.
 */
export class InquirerService implements IPrompt {
  /**
   * Ask questions and return answers from prompt;
   * @param questions questions to be asked in prompt.
   * @returns answers collected from prompt.
   */
  async askQuestions<Q, A>(questions: Question<Q>[]): Promise<A> {
    const answers = await inquirer.prompt<A>(questions);

    return answers;
  }
}

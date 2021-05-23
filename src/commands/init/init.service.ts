import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {IInit} from './init.interface';
import inquirer = require('inquirer');
import {InitQuestion, InitQuestions} from './init.questions';

/**
 * Class responsible for implement the init command.
 */
export class Init implements ICommand {
  /**
   * Return the init command name.
   */
  whoami: Command = Command.init;

  /**
   * Ask essencial questions for init.
   * @returns Answers from input.
   */
  async askQuestions(): Promise<InitQuestion> {
    const questions = [
      {
        name: InitQuestions.PROJECT_NAME,
        type: 'input',
        message: 'What is the name of the project?',
        default: 'my-project',
      },
      {
        name: InitQuestions.THIRD_PARTY_GTS,
        type: 'confirm',
        message: 'Should install GTS?',
        default: true,
      },
      {
        name: InitQuestions.THIRD_PARTY_JEST,
        type: 'confirm',
        message: 'Should install Jest?',
        default: true,
      },
      {
        name: InitQuestions.DEV_OPS_TRAVIS,
        type: 'confirm',
        message: 'Should start with Travis?',
        default: true,
      },
    ];

    const answers = await inquirer.prompt<InitQuestion>(questions);

    return answers;
  }

  /**
   * Create the skeleton. Execute third parties.
   * @param options The options typed in the terminal.
   */
  async run(): Promise<void> {
    const answers = await this.askQuestions();

    const projectName = answers[InitQuestions.PROJECT_NAME];
    await this.skeleton.init(projectName);
    await this.babel.init(projectName);

    if (answers[InitQuestions.THIRD_PARTY_GTS]) {
      await this.gts.init(projectName);
    }

    if (answers[InitQuestions.THIRD_PARTY_JEST]) {
      await this.jest.init(projectName);
    }

    if (answers[InitQuestions.DEV_OPS_TRAVIS]) {
      await this.travis.init(projectName);
    }
  }

  /**
   * The third-parties.
   * @param babel Babel.
   * @param gts Google Typescript.
   * @param jest Jest.
   * @param travis Travis CI.
   * @param skeleton Skeleton.
   */
  constructor(
    private babel: IInit,
    private gts: IInit,
    private jest: IInit,
    private travis: IInit,
    private skeleton: IInit
  ) {}
}

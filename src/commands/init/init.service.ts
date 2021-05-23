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
    ];

    const answers = await inquirer.prompt<InitQuestion>(questions);

    return answers;
  }

  /**
   * Create the skeleton. Execute third parties.
   * @param options The options typed in the terminal.
   */
  async run(): Promise<void> {
    const questions = await this.askQuestions();

    await this.skeleton.init(questions.projectName);
    await this.babel.init(questions.projectName);
    await this.gts.init(questions.projectName);
    await this.jest.init(questions.projectName);
    await this.travis.init(questions.projectName);
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

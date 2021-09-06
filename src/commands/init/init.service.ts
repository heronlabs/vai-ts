import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {IInit} from './init.interface';
import inquirer = require('inquirer');
import {InitQuestion, InitQuestions} from './init.questions';
import ora = require('ora');
import chalk = require('chalk');

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
    console.log(chalk.white.bgCyan.bold(' [1/3] Asking '));
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
   * Initialize all modules asked.
   * @param answers Answers from terminal input.
   */
  private async work(answers: InitQuestion): Promise<void> {
    console.log(chalk.white.bgBlue.bold(' [2/3] Working '));
    const progressRoot = ora('Initialize Node resources...').start();
    const projectName = answers[InitQuestions.PROJECT_NAME];
    await this.skeleton.init(projectName);

    progressRoot.stopAndPersist({
      symbol: '📦',
      text: 'All done initializing Node!',
    });

    if (answers[InitQuestions.THIRD_PARTY_GTS]) {
      const progressGTS = ora(
        'Initialize Google Typescript resources...'
      ).start();
      await this.gts.init(projectName);
      progressGTS.stopAndPersist({
        symbol: '📘',
        text: 'All done initializing Google Typescript!',
      });
    }

    if (answers[InitQuestions.THIRD_PARTY_JEST]) {
      const progressJest = ora('Initialize Jest resources...').start();
      await this.jest.init(projectName);
      progressJest.stopAndPersist({
        symbol: '🃏',
        text: 'All done initializing Jest!',
      });
    }

    if (answers[InitQuestions.DEV_OPS_TRAVIS]) {
      const progressTravis = ora('Initialize Travis resources...').start();
      await this.travis.init(projectName);
      progressTravis.stopAndPersist({
        symbol: '🤖',
        text: 'All done initializing Travis!',
      });
    }
  }

  /**
   * Ask and work in which packages should be initialize.
   */
  async run(): Promise<void> {
    const answers = await this.askQuestions();
    await this.work(answers);
    console.log(chalk.white.bgGreen.bold(' [3/3] Finish '));
  }

  /**
   * The third-parties.
   * @param gts Google Typescript.
   * @param jest Jest.
   * @param travis Travis CI.
   * @param skeleton Skeleton.
   */
  constructor(
    private gts: IInit,
    private jest: IInit,
    private travis: IInit,
    private skeleton: IInit
  ) {}
}

import {BackgroundColor, Color} from '../../services/print/print-options.model';
import {InitAnswers, InitQuestions} from './init.questions';

import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {IInit} from './init.interface';
import {IPrint} from '../../services/print/print.interface';
import {IPrompt} from '../../services/prompt/prompt.interface';
import {Question} from '../../services/prompt/question.model';
import {QuestionType} from '../../services/prompt/question.enum';

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
  private async askQuestions(): Promise<InitAnswers> {
    const questions: Question<InitQuestions>[] = [
      {
        name: InitQuestions.PROJECT_NAME,
        type: QuestionType.INPUT,
        message: 'What is the name of the project?',
        default: 'my-project',
      },
      {
        name: InitQuestions.THIRD_PARTY_GTS,
        type: QuestionType.CONFIRM,
        message: 'Should install GTS?',
        default: true,
      },
      {
        name: InitQuestions.THIRD_PARTY_JEST,
        type: QuestionType.CONFIRM,
        message: 'Should install Jest?',
        default: true,
      },
      {
        name: InitQuestions.DEV_OPS_TRAVIS,
        type: QuestionType.CONFIRM,
        message: 'Should start with Travis?',
        default: true,
      },
    ];

    const answers = await this.prompt.askQuestions<InitQuestions, InitAnswers>(
      questions
    );

    return answers;
  }

  /**
   * Initialize all modules asked.
   * @param answers Answers from terminal input.
   */
  private async initializeModules(answers: InitAnswers): Promise<void> {
    const projectName = answers[InitQuestions.PROJECT_NAME];
    await this.skeleton.init(projectName);

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
   * Ask and initialize modules in which packages should be initialize.
   */
  async run(): Promise<void> {
    this.print.log(' [1/3] Asking ', {
      color: Color.WHITE,
      backgroundColor: BackgroundColor.BG_CYAN,
    });
    const answers = await this.askQuestions();

    this.print.log(' [2/3] Working ', {
      color: Color.WHITE,
      backgroundColor: BackgroundColor.BG_BLUE,
    });
    await this.initializeModules(answers);

    this.print.log(' [3/3] Finish ', {
      color: Color.WHITE,
      backgroundColor: BackgroundColor.BG_GREEN,
    });
  }

  /**
   * The third-parties.
   * @param gts Google Typescript.
   * @param jest Jest.
   * @param travis Travis CI.
   * @param skeleton Skeleton.
   * @param print Service for print in console.
   * @param prompt Service for prompt in console.
   */
  constructor(
    private gts: IInit,
    private jest: IInit,
    private travis: IInit,
    private skeleton: IInit,
    private print: IPrint,
    private prompt: IPrompt
  ) {}
}

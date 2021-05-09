import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {IInit} from './init.interface';
import {InitOptions} from './options.enum';
import {Skeleton} from './skeleton/skeleton.service';
import {each} from 'lodash';

/**
 * Class responsible for implement the init command.
 */
export class Init implements ICommand {
  /**
   * Return the init command name.
   */
  whoami: Command = Command.init;

  /**
   * Return the options avaliable for init command.
   * @returns Init commands.
   */
  getOptions(): string[] {
    return Object.values(InitOptions);
  }

  /**
   * Check for the project name typed.
   * @param options The options typed in the terminal.
   * @returns The project name.
   */
  private getProjectName(options: string[]): string {
    let projectName = 'my-project';

    each(options, option => {
      if (option.includes('=')) {
        const optionSplited = option.split('=');
        const optionToBeValidate = `${optionSplited[0]}=`;
        if (optionToBeValidate === InitOptions.projectName) {
          projectName = optionSplited[1];
        }
      }
    });

    return projectName;
  }

  /**
   * Create the skeleton. Execute third parties.
   * @param options The options typed in the terminal.
   */
  async run(options: string[]): Promise<void> {
    const projectName = this.getProjectName(options);

    await this.skeleton.createProjectFolder(projectName);
    this.skeleton.createPackageFile(projectName);
    await this.skeleton.installDependencies(projectName);
    this.skeleton.createIndexFile(projectName);
    this.skeleton.createGitIgnoreFile(projectName);
    await this.skeleton.createVsCodeDebuggerFile(projectName);

    await this.babel.init(projectName);

    await this.gts.init(projectName);

    await this.jest.init(projectName);

    await this.travis.init(projectName);
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
    private skeleton: Skeleton
  ) {}
}

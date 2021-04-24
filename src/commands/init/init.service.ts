import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {Babel} from './babel.service';
import {Git} from './git.service';
import {GTS} from './gts.service';
import {Jest} from './jest.service';
import {InitOptions} from './options.enum';
import {Struct} from './struct.service';
import {Travis} from './travis.service';
import {each} from 'lodash';

export class Init implements ICommand {
  whoami: Command = Command.init;

  getOptions(): string[] {
    return Object.values(InitOptions);
  }

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

  async run(options: string[]): Promise<void> {
    const projectName = this.getProjectName(options);

    await this.struct.createProjectFolder(projectName);
    this.struct.createPackageFile(projectName);
    await this.struct.installDependencies(projectName);

    this.babel.createBabelFile(projectName);

    this.git.createGitIgnoreFile(projectName);

    this.gts.createESLintFiles(projectName);
    this.gts.createPrettierFile(projectName);
    this.gts.createTsConfigFile(projectName);

    this.jest.createJestConfigFile(projectName);
    this.jest.createJestSetup(projectName);

    this.travis.createTravisFile(projectName);
  }

  constructor(
    private babel: Babel,
    private git: Git,
    private gts: GTS,
    private jest: Jest,
    private struct: Struct,
    private travis: Travis
  ) {}
}

import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {Babel} from './babel.service';
import {Git} from './git.service';
import {GTS} from './gts.service';
import {Jest} from './jest.service';
import {InitOptions} from './options.enum';
import {Struct} from './struct.service';
import {Travis} from './travis.service';
import * as path from 'path';

export class Init implements ICommand {
  whoami: Command = Command.init;

  getOptions(): string[] {
    return Object.values(InitOptions);
  }

  private getProjectName(): string {
    const currentDir = process.cwd().split(path.sep).pop();

    if (currentDir) {
      return currentDir;
    }

    return 'my-project';
  }

  async run(): Promise<void> {
    const projectName = this.getProjectName();

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

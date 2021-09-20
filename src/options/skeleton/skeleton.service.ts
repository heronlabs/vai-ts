import * as fs from 'fs';

import {copyInProjectFolder, exec, execInProjectFolder} from '../../utils/exec';

import {IInit} from '../../commands/init/init.interface';
import {InfinityProgressFactory} from '../../services/infinity-progress/infinity-progress.factory';

import path = require('path');

/**
 * Class responsible for create the project skeleton.
 * I choose this name because package word is reserverd in node;
 * Should have one interface for the flow be executed correclty.
 */
export class Skeleton implements IInit {
  /**
   * Create the project folder based on the name of the project.
   * @param projectName The project name.
   */
  async createProjectFolder(projectName: string) {
    await exec(`mkdir ${projectName}`);
  }

  /**
   * Move Skeleton templates.
   * @param projectName The project name.
   */
  async moveSkeletonTemplates(projectName: string) {
    const templatesFolder = path.join(__dirname, './templates');
    await copyInProjectFolder(projectName, templatesFolder);
  }

  /**
   * Replace package name.
   * @param projectName The project name.
   */
  replacePackageName(projectName: string) {
    const packageFileString = fs.readFileSync(
      `${projectName}/package.json`,
      'utf8'
    );
    const packageFile = JSON.parse(packageFileString);

    packageFile.name = projectName;

    const updatedPackageFile = JSON.stringify(packageFile, null, 2).concat(
      '\n'
    );

    fs.writeFileSync(`${projectName}/package.json`, updatedPackageFile);
  }

  /**
   * Install all dependencies.
   * Should be able to choose between yarn and npm.
   * @param projectName The project name.
   */
  async installDependencies(projectName: string) {
    await execInProjectFolder(projectName, 'yarn');
  }

  async init(projectName: string): Promise<void> {
    const progress = InfinityProgressFactory.makeInfinityProgress(
      'Initializing Skeleton Module...'
    );

    await this.createProjectFolder(projectName);
    await this.moveSkeletonTemplates(projectName);
    this.replacePackageName(projectName);
    await this.installDependencies(projectName);

    progress.stop({
      symbol: '📦',
      text: 'All done initializing Node!',
    });
  }
}

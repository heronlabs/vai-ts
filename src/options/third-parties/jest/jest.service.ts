import * as fs from 'fs';

import {copyInProjectFolder, execInProjectFolder} from '../../../utils/exec';

import {IInit} from '../../../commands/init/init.interface';
import {InfinityProgressFactory} from '../../../services/infinity-progress/infinity-progress.factory';

import path = require('path');

/**
 * Class responsible for Jest files.
 */
export class Jest implements IInit {
  /**
   * Install dependencies inside project.
   * @param projectName The project name.
   */
  async installJest(projectName: string): Promise<void> {
    await execInProjectFolder(
      projectName,
      'yarn add -D @types/jest babel-jest jest jest-junit ts-jest moq.ts codecov winston'
    );
  }

  /**
   * Move Jest templates.
   * @param projectName The project name.
   */
  async moveJestTemplates(projectName: string) {
    const templatesFolder = path.join(__dirname, './templates');
    await copyInProjectFolder(projectName, templatesFolder);
  }

  /**
   * Add scripts for Jest.
   * @param projectName The project name.
   */
  addJestScripts(projectName: string) {
    const packageFileString = fs.readFileSync(
      `${projectName}/package.json`,
      'utf8'
    );
    const packageFile = JSON.parse(packageFileString);

    packageFile.scripts['test'] =
      'jest --runInBand --detectOpenHandles --colors --verbose --reporters=default';
    packageFile.scripts['test-watch'] = 'yarn test --watch';
    packageFile.scripts['test-coverage'] = 'yarn test --coverage';
    packageFile.scripts['test-coverage-upload'] =
      'yarn test-coverage && codecov';

    const updatedPackageFile = JSON.stringify(packageFile, null, 2).concat(
      '\n'
    );

    fs.writeFileSync(`${projectName}/package.json`, updatedPackageFile);
  }

  /**
   * Implement init command for Jest by:
   * * Installing dependencies.
   * * Moving templates.
   * * Add scripts.
   * @param projectName The project name.
   */
  async init(projectName: string): Promise<void> {
    const progress = InfinityProgressFactory.makeInfinityProgress(
      'Initializing Jest Module...'
    );

    await this.installJest(projectName);
    await this.moveJestTemplates(projectName);
    this.addJestScripts(projectName);

    progress.stop({
      symbol: '🃏',
      text: 'All done initializing Jest!',
    });
  }
}

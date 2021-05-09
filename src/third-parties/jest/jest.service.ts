import * as fs from 'fs';

import {copyInProjectFolder, execInProjectFolder} from '../../lib/exec';

import {IInit} from '../../commands/init/init.interface';

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
      'yarn add -D @types/jest babel-jest jest jest-junit ts-jest winston'
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
      'npx jest --runInBand --detectOpenHandles --colors --verbose --reporters=default';
    packageFile.scripts['test-watch'] = 'yarn test --watch';
    packageFile.scripts['test-coverage'] = 'yarn test --coverage';
    packageFile.scripts['test-coverage-upload'] =
      'yarn test-coverage && codecov';

    const updatedPackageFile = JSON.stringify(packageFile, null, 2);

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
    await this.installJest(projectName);
    await this.moveJestTemplates(projectName);
    this.addJestScripts(projectName);
  }
}

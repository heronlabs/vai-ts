import * as fs from 'fs';

import {copyInProjectFolder, execInProjectFolder} from '../../../utils/exec';

import {IInit} from '../../../commands/init/init.interface';
import {InfinityProgressFactory} from '../../../services/infinity-progress/infinity-progress.factory';

import path = require('path');

/**
 * Class responsible for config Google Type Script
 * Maybe copy files from this own project will be a better way to work;
 */
export class GTS implements IInit {
  /**
   * Install dependencies inside project.
   * @param projectName The project name.
   */
  async installGTS(projectName: string): Promise<void> {
    await execInProjectFolder(projectName, 'yarn add -D gts');
  }

  /**
   * Move GTS templates.
   * @param projectName The project name.
   */
  async moveGTSTemplates(projectName: string) {
    const templatesFolder = path.join(__dirname, './templates');
    await copyInProjectFolder(projectName, templatesFolder);
  }

  /**
   * Add scripts for GTS.
   * @param projectName The project name.
   */
  addGTSScripts(projectName: string) {
    const packageFileString = fs.readFileSync(
      `${projectName}/package.json`,
      'utf8'
    );
    const packageFile = JSON.parse(packageFileString);

    packageFile.scripts['lint'] = 'gts lint';
    packageFile.scripts['lint-clean'] = 'gts clean';
    packageFile.scripts['lint-fix'] = 'gts fix';

    const updatedPackageFile = JSON.stringify(packageFile, null, 2);

    fs.writeFileSync(`${projectName}/package.json`, updatedPackageFile);
  }

  /**
   * Implement init command for GTS by:
   * * Installing dependencies.
   * * Moving templates.
   * * Add scripts.
   * @param projectName The project name.
   */
  async init(projectName: string): Promise<void> {
    const progress = InfinityProgressFactory.makeInfinityProgress(
      'Initializing Google Typescript Module...'
    );

    await this.installGTS(projectName);
    await this.moveGTSTemplates(projectName);
    this.addGTSScripts(projectName);

    progress.stop({
      symbol: '📘',
      text: 'All done initializing Google Typescript!',
    });
  }
}

import {IInit} from '../../commands/init/init.interface';
import {execInProjectFolder} from '../../lib/exec';

import path = require('path');

/**
 * Class responsible for Babel configurations.
 */
export class Babel implements IInit {
  /**
   * Install dependencies inside project.
   * @param projectName The project name.
   */
  async installBabel(projectName: string): Promise<void> {
    await execInProjectFolder(
      projectName,
      'yarn add @babel/core @babel/preset-env @babel/preset-typescript @babel/register'
    );
  }

  /**
   * Move Babel templates.
   * @param projectName The project name.
   */
  async moveBabelTemplates(projectName: string) {
    const templatesFolder = path.join(__dirname, './templates');
    await execInProjectFolder(projectName, `cp ${templatesFolder}/* ./`);
  }

  async init(projectName: string): Promise<void> {
    await this.installBabel(projectName);
    await this.moveBabelTemplates(projectName);
  }
}

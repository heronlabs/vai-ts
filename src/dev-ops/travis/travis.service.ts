import * as fs from 'fs';

import {IInit} from '../../commands/init/init.interface';
import {travisConfig} from './templates/travis.template';

/**
 * Class responsible for Travis configuration.
 * Should include more options, like:
 * * Which script run and how run.
 * * Incorporate another yaml files.
 */
export class Travis implements IInit {
  /**
   * Create the Travis CI-CD file.
   * @param projectName The project name.
   */
  createTravisFile(projectName: string) {
    const travisConfigFile = travisConfig();
    fs.writeFileSync(`${projectName}/.travis.yml`, travisConfigFile);
  }

  /**
   * Implement init command for Travis by:
   * * Creating templates.
   * @param projectName The project name.
   */
  async init(projectName: string): Promise<void> {
    this.createTravisFile(projectName);
  }
}

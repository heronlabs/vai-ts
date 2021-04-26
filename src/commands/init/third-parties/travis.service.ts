import * as fs from 'fs';
import {travisConfig} from '../../../templates/travis/travis.template';

/**
 * Class responsible for Travis configuration.
 * Should include more options, like:
 * * Which script run and how run.
 * * Incorporate another yaml files.
 */
export class Travis {
  /**
   * [RANDOM] - Create the Travis CI-CD file.
   * @param projectName The project name.
   */
  createTravisFile(projectName: string) {
    const travisConfigFile = travisConfig();
    fs.writeFileSync(`${projectName}/.travis.yml`, travisConfigFile);
  }
}

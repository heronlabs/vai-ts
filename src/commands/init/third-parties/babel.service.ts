import * as fs from 'fs';
import {babelConfig} from '../../../templates/babel/babel.template';

/**
 * Class responsible for Babel configurations.
 */
export class Babel {
  /**
   * [RANDOM] - Create the babel.config.js file.
   * [RANDOM] - This file is the config for Jest works with ES6.
   * @param projectFolder The Folder where is the project.
   */
  createBabelFile(projectFolder: string) {
    const babelFile = babelConfig();
    fs.writeFileSync(`${projectFolder}/babel.config.js`, babelFile);
  }
}

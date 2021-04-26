import * as fs from 'fs';

import {
  eslintIgnoreConfig,
  eslintrcConfig,
} from '../../../templates/gts/eslint.template';

import {prettierConfig} from '../../../templates/gts/prettier.template';
import {tsConfig} from '../../../templates/gts/tsconfig.template';

/**
 * Class responsible for config Google Type Script
 * Maybe copy files from this own project will be a better way to work;
 */
export class GTS {
  /**
   * [RANDOM] - Create the typescript configuration file.
   * [RANDOM] - Here you will find the compile options.
   * @param projectName The project name.
   */
  createTsConfigFile(projectFolder: string) {
    const tsConfigFile = tsConfig();
    fs.writeFileSync(`${projectFolder}/tsconfig.json`, tsConfigFile);
  }

  /**
   * [RANDOM] - Create the Prettier file.
   * [RANDOM] - Here you will find the gts config for beatify.
   * @param projectName The project name.
   */
  createPrettierFile(projectFolder: string) {
    const prettierConfigFile = prettierConfig();
    fs.writeFileSync(`${projectFolder}/.prettierrc.js`, prettierConfigFile);
  }

  /**
   * [RANDOM] - Create the EcmaScript Lint file.
   * [RANDOM] - Here you will find the gts config for lint.
   * @param projectName The project name.
   */
  createESLintFiles(projectFolder: string) {
    const eslintIgnoreFile = eslintIgnoreConfig();
    fs.writeFileSync(`${projectFolder}/.eslintignore`, eslintIgnoreFile);

    const eslintrcFile = eslintrcConfig();
    fs.writeFileSync(`${projectFolder}/.eslintrc.json`, eslintrcFile);
  }
}

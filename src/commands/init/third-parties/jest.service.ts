import * as fs from 'fs';
import {jestConfig} from '../../../templates/jest/jestconfig.template';
import {jestSetupConfig} from '../../../templates/jest/jestsetup.template';

/**
 * Class responsible for Jest files.
 */
export class Jest {
  /**
   * [RANDOM] - Create the Jest Config File.
   * [RANDOM] - Here you will find the compiler options, including:
   * [RANDOM] - * ts-jest
   * [RANDOM] - * ts-junit
   * [RANDOM] - * jest.setup-file.ts
   * @param projectName The project name.
   */
  createJestConfigFile(projectFolder: string) {
    const jestConfigFile = jestConfig();
    fs.writeFileSync(`${projectFolder}/jest.config.js`, jestConfigFile);
  }

  /**
   * [RANDOM] - Create the Jest Setup File.
   * [RANDOM] - Here you will find log options for jest.
   * @param projectName The project name.
   */
  createJestSetup(projectFolder: string) {
    const jestSetupFile = jestSetupConfig();
    fs.writeFileSync(`${projectFolder}/jest.setup-file.ts`, jestSetupFile);
  }
}

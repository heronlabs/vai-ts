import * as fs from 'fs';
import {jestConfig} from '../../templates/jest/jestconfig.template';
import {jestSetupConfig} from '../../templates/jest/jestsetup.template';

export class Jest {
  createJestConfigFile(projectFolder: string) {
    const jestConfigFile = jestConfig();
    fs.writeFileSync(`${projectFolder}/jest.config.js`, jestConfigFile);
  }

  createJestSetup(projectFolder: string) {
    const jestSetupFile = jestSetupConfig();
    fs.writeFileSync(`${projectFolder}/jest.setup-file.ts`, jestSetupFile);
  }
}

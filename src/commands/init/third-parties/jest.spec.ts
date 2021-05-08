import * as fs from 'fs';

import {Jest} from './jest.service';
import {jestConfig} from '../../../templates/jest/jestconfig.template';
import {jestSetupConfig} from '../../../templates/jest/jestsetup.template';

describe('Jest', () => {
  it('Should create Jest config file', async () => {
    const _jest = new Jest();
    const jestConfigFile = jestConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    _jest.createJestConfigFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/jest.config.js`,
      jestConfigFile
    );
  });

  it('Should create Jest setup file', async () => {
    const _jest = new Jest();
    const jestSetupFile = jestSetupConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    _jest.createJestSetup(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/jest.setup-file.ts`,
      jestSetupFile
    );
  });
});

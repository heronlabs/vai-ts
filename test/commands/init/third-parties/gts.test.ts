import * as fs from 'fs';

import {
  eslintIgnoreConfig,
  eslintrcConfig,
} from '../../../../src/templates/gts/eslint.template';

import {GTS} from '../../../../src/commands/init/third-parties/gts.service';
import {prettierConfig} from '../../../../src/templates/gts/prettier.template';
import {tsConfig} from '../../../../src/templates/gts/tsconfig.template';

describe('GTS', () => {
  it('Should create TSConfig file', async () => {
    const gts = new GTS();
    const tsConfigFile = tsConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    gts.createTsConfigFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/tsconfig.json`,
      tsConfigFile
    );
  });

  it('Should create Prettier file', async () => {
    const gts = new GTS();
    const prettierrcFile = prettierConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    gts.createPrettierFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.prettierrc.js`,
      prettierrcFile
    );
  });

  it('Should create ESLint files', async () => {
    const gts = new GTS();
    const eslintIgnoreFile = eslintIgnoreConfig();
    const eslintrcFile = eslintrcConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    gts.createESLintFiles(projectFolder);

    expect(writeFileSync).toHaveBeenNthCalledWith(
      1,
      `${projectFolder}/.eslintignore`,
      eslintIgnoreFile
    );

    expect(writeFileSync).toHaveBeenNthCalledWith(
      2,
      `${projectFolder}/.eslintrc.json`,
      eslintrcFile
    );
  });
});

import * as fs from 'fs';

import {
  eslintIgnoreConfig,
  eslintrcConfig,
} from '../../templates/gts/eslint.template';

import {prettierConfig} from '../../templates/gts/prettier.template';
import {tsConfig} from '../../templates/gts/tsconfig.template';

export class GTS {
  createTsConfigFile(projectFolder: string) {
    const tsConfigFile = tsConfig();
    fs.writeFileSync(`${projectFolder}/tsconfig.json`, tsConfigFile);
  }

  createPrettierFile(projectFolder: string) {
    const prettierConfigFile = prettierConfig();
    fs.writeFileSync(`${projectFolder}/.prettierrc.js`, prettierConfigFile);
  }

  createESLintFiles(projectFolder: string) {
    const eslintIgnoreFile = eslintIgnoreConfig();
    fs.writeFileSync(`${projectFolder}/.eslintignore`, eslintIgnoreFile);

    const eslintrcFile = eslintrcConfig();
    fs.writeFileSync(`${projectFolder}/.eslintrc.json`, eslintrcFile);
  }
}

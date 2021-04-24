import * as fs from 'fs';

import {exec, execInProjectFolder} from '../../lib/exec';

import {packageConfig} from '../../templates/struct/package.template';

export class Struct {
  async createProjectFolder(projectName: string) {
    await exec(`mkdir ${projectName}`);
  }

  createPackageFile(projectName: string) {
    const packageConfigFile = packageConfig(projectName);
    fs.writeFileSync(`${projectName}/package.json`, packageConfigFile);
  }

  async installDependencies(projectName: string) {
    await execInProjectFolder(projectName, 'yarn');
  }
}

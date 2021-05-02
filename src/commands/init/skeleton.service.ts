import * as fs from 'fs';

import {exec, execInProjectFolder} from '../../lib/exec';

import {
  indexConfig,
  packageConfig,
} from '../../templates/skeleton/package.template';

/**
 * Class responsible for create the project skeleton.
 * I choose this name because package word is reserverd in node;
 * Should have one interface for the flow be executed correclty.
 */
export class Skeleton {
  /**
   * [1] - SHOULD BE THE FIRST.
   * [1] - Create the project folder based on the name of the project.
   * @param projectName The project name.
   */
  async createProjectFolder(projectName: string) {
    await exec(`mkdir ${projectName}`);
    await exec(`mkdir ${projectName}/src`);
  }

  /**
   * [2] - SHOULD BE THE SECOND.
   * [2] - Create the package.json file.
   * @param projectName The project name.
   */
  createPackageFile(projectName: string) {
    const packageConfigFile = packageConfig(projectName);
    fs.writeFileSync(`${projectName}/package.json`, packageConfigFile);
  }

  /**
   * [3] - SHOULD BE THE THRID.
   * [3] - Install all dependencies.
   * [3] - Should be able to choose between yarn and npm.
   * @param projectName The project name.
   */
  async installDependencies(projectName: string) {
    await execInProjectFolder(projectName, 'yarn');
  }

  /**
   * [RANDOM] - Create a index file with basic configs, like:
   * Use Strict
   * Reflect metadata.
   * @param projectName The project name.
   */
  async createIndexFile(projectName: string) {
    const indexConfigFile = indexConfig();
    fs.writeFileSync(`${projectName}/src/index.ts`, indexConfigFile);
  }
}

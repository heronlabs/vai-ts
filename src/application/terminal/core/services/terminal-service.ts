import {execSync} from 'child_process';

import {RunnerOptions} from '../enums/runner-options-enum';
import {Terminal} from '../interfaces/terminal';

export class TerminalService implements Terminal {
  async installNodePackages(
    targetDirectory: string,
    runnerOption: RunnerOptions
  ): Promise<boolean> {
    try {
      execSync(`${runnerOption} install`, {
        cwd: `./${targetDirectory}`,
        stdio: 'ignore',
      });
    } catch (error) {
      console.log(error);
    }

    return true;
  }
}

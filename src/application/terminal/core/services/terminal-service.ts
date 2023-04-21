import {execSync} from 'child_process';

import {RunnerOptions} from '../enums/runner-options-enum';
import {Terminal} from '../interfaces/terminal';

export class TerminalService implements Terminal {
  async installNodePackages(
    targetDirectory: string,
    runnerOption: RunnerOptions
  ): Promise<boolean> {
    const runners = [
      {
        runner: RunnerOptions.NPM,
        command: 'npm ci',
      },
      {
        runner: RunnerOptions.YARN,
        command: 'yarn install --frozen-lockfile',
      },
    ];

    const {command} = runners.filter(
      runner => runner.runner === runnerOption
    )[0];

    execSync(command, {
      cwd: `./${targetDirectory}`,
      // stdio: 'ignore',
    });

    return true;
  }
}

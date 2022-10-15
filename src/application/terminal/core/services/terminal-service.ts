import {execSync} from 'child_process';

import {Terminal} from '../interfaces/terminal';

export class TerminalService implements Terminal {
  async installNodePackages(targetDirectory: string): Promise<boolean> {
    execSync('yarn --frozen-lockfile', {
      cwd: `./${targetDirectory}`,
      stdio: 'ignore',
    });

    return true;
  }
}

import {execSync} from 'child_process';

import {InstallPackages} from '../interfaces/install-packages';

export class InstallBoilerplatePackagesService implements InstallPackages {
  async install(targetDirectory: string): Promise<boolean> {
    execSync('yarn --frozen-lockfile', {
      cwd: `./${targetDirectory}`,
      stdio: 'ignore',
    });

    return true;
  }
}

import {execSync} from 'child_process';

import {InstallPackages} from '../interfaces/install-packages';

export class InstallBoilerplatePackagesService implements InstallPackages {
  async install(targetDirectory: string): Promise<void> {
    execSync('yarn', {
      cwd: `./${targetDirectory}`,
      stdio: 'ignore',
    });
  }
}

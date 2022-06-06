import faker from '@faker-js/faker';
import * as cp from 'child_process';

import {InstallPackages} from '../../../../src/core/interfaces/install-packages';
import {InstallBoilerplatePackagesService} from '../../../../src/core/services/install-boilerplate-packages-service';

describe('Given Install Boilerplate Packages Service', () => {
  let service: InstallPackages;

  beforeEach(() => {
    service = new InstallBoilerplatePackagesService();
  });

  describe('Given install method', () => {
    it('Should install dependencies in target directory', async () => {
      const execSpy = jest.spyOn(cp, 'execSync').mockImplementation();

      const targetDirectory = faker.lorem.words();

      await service.install(targetDirectory);

      const execOptions = execSpy.mock.calls[0][1];
      expect(execOptions).toEqual({
        cwd: `./${targetDirectory}`,
        stdio: 'ignore',
      });
    });
  });
});

import faker from '@faker-js/faker';

import {InitBoilerplateCommand} from '../../../../src/application/cli/commands/init/init-boilerplate-command';
import {CloneGitMock} from '../../__mocks__/clone-git-mock';
import {InstallPackagesMock} from '../../__mocks__/install-packages-mock';

describe('Given Init Boilerplate Command', () => {
  let command: InitBoilerplateCommand;

  beforeEach(() => {
    command = new InitBoilerplateCommand(CloneGitMock, InstallPackagesMock);
  });

  describe('Given run method', () => {
    it('Should initialize boilerplate successfully', async () => {
      CloneGitMock.clone.mockResolvedValueOnce(undefined);
      InstallPackagesMock.install.mockResolvedValueOnce(undefined);
      const envelopeSpy = jest.spyOn(console, 'log').mockImplementation();

      await command.run([], {
        projectName: faker.lorem.word(),
      });

      expect(envelopeSpy).toHaveBeenNthCalledWith(1, expect.any(String));
    });
  });
});

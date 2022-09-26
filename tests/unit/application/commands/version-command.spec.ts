import {faker} from '@faker-js/faker';

import {VersionCommand} from '../../../../src/application/cli/commands/version/version-command';
import {PackageEntity} from '../../../../src/core/entities/package-entity';
import {ConsoleMock} from '../../__mocks__/application/cli/presenters/console-mock';
import {PackageInteractorMock} from '../../__mocks__/core/services/package-interactor-mock';

describe('Given Version Command', () => {
  let command: VersionCommand;

  beforeEach(() => {
    command = new VersionCommand(PackageInteractorMock, ConsoleMock);
  });

  describe('Given run method', () => {
    it('Should print package.json version', async () => {
      const file = {version: faker.system.semver()};
      const packageFile = PackageEntity.make(JSON.stringify(file));

      PackageInteractorMock.readSelf.mockReturnValueOnce(packageFile);
      ConsoleMock.envelope.mockReturnValue(undefined);

      await command.run();

      expect(ConsoleMock.envelope).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(file.version)
      );
    });
  });
});

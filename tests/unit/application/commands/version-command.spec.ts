import faker from '@faker-js/faker';

import {VersionCommand} from '../../../../src/application/cli/commands/version/version-command';
import {PackageEntity} from '../../../../src/core/entities/package-entity';
import {ReadAssetsMock} from '../../__mocks__/read-assets-mock';

describe('Given Version Command', () => {
  let command: VersionCommand;

  beforeEach(() => {
    command = new VersionCommand(ReadAssetsMock);
  });

  describe('Given run method', () => {
    it('Should print package.json version', async () => {
      const file = {version: faker.system.semver()};
      const packageFile = PackageEntity.make(JSON.stringify(file));

      ReadAssetsMock.readFile.mockReturnValueOnce(packageFile);

      const envelopeSpy = jest.spyOn(console, 'log').mockImplementation();

      await command.run();

      expect(envelopeSpy).toHaveBeenNthCalledWith(
        1,
        expect.stringMatching(file.version)
      );
    });
  });
});

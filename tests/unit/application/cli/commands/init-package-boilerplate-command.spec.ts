import {faker} from '@faker-js/faker';

import {InitPackageBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-package-boilerplate-command';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {TerminalMock} from '../../../__mocks__/application/terminal/services/terminal-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init Package Boilerplate Command', () => {
  let command: InitPackageBoilerplateCommand;

  beforeEach(() => {
    command = new InitPackageBoilerplateCommand(
      RepositoryInteractorMock,
      TerminalMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize basic boilerplate successfully', async () => {
      RepositoryInteractorMock.clone.mockResolvedValueOnce(undefined);
      TerminalMock.installNodePackages.mockResolvedValueOnce(undefined);
      ConsoleMock.envelope.mockReturnValue(undefined);

      await command.run([], {
        name: faker.lorem.word(),
      });

      expect(ConsoleMock.envelope).toHaveBeenNthCalledWith(
        1,
        expect.any(String)
      );
    });
  });
});

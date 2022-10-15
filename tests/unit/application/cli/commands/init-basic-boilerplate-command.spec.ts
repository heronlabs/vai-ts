import {faker} from '@faker-js/faker';

import {InitBasicBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-basic-boilerplate-command';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';
import {TerminalMock} from '../../../__mocks__/infrastructure/terminal/services/terminal-mock';

describe('Given Init Basic Boilerplate Command', () => {
  let command: InitBasicBoilerplateCommand;

  beforeEach(() => {
    command = new InitBasicBoilerplateCommand(
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
        projectName: faker.lorem.word(),
      });

      expect(ConsoleMock.envelope).toHaveBeenNthCalledWith(
        1,
        expect.any(String)
      );
    });
  });
});

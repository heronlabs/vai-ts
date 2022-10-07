import {faker} from '@faker-js/faker';

import {InitApiBoilerplateCommand} from '../../../../src/application/cli/commands/init/init-api-boilerplate-command';
import {ConsoleMock} from '../../__mocks__/application/cli/presenters/console-mock';
import {RepositoryInteractorMock} from '../../__mocks__/core/services/repository-interactor-mock';
import {TerminalMock} from '../../__mocks__/infrastructure/terminal/services/terminal-mock';

describe('Given Init API Boilerplate Command', () => {
  let command: InitApiBoilerplateCommand;

  beforeEach(() => {
    command = new InitApiBoilerplateCommand(
      RepositoryInteractorMock,
      TerminalMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize API boilerplate successfully', async () => {
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

import {faker} from '@faker-js/faker';

import {InitCmsBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-cms-boilerplate-command';
import {RunnerOptions} from '../../../../../src/application/terminal/core/enums/runner-options-enum';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {TerminalMock} from '../../../__mocks__/application/terminal/services/terminal-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init CMS Boilerplate Command', () => {
  let command: InitCmsBoilerplateCommand;

  beforeEach(() => {
    command = new InitCmsBoilerplateCommand(
      RepositoryInteractorMock,
      TerminalMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize CMS boilerplate successfully by npm', async () => {
      RepositoryInteractorMock.clone.mockResolvedValueOnce(undefined);
      TerminalMock.installNodePackages.mockResolvedValueOnce(undefined);
      ConsoleMock.envelope.mockReturnValue(undefined);

      await command.run([], {
        name: faker.lorem.word(),
        runner: RunnerOptions.NPM,
      });

      expect(ConsoleMock.envelope).toHaveBeenNthCalledWith(
        1,
        expect.any(String)
      );
    });

    it('Should initialize CMS boilerplate successfully by yarn', async () => {
      RepositoryInteractorMock.clone.mockResolvedValueOnce(undefined);
      TerminalMock.installNodePackages.mockResolvedValueOnce(undefined);
      ConsoleMock.envelope.mockReturnValue(undefined);

      await command.run([], {
        name: faker.lorem.word(),
        runner: RunnerOptions.YARN,
      });

      expect(ConsoleMock.envelope).toHaveBeenNthCalledWith(
        1,
        expect.any(String)
      );
    });
  });
});

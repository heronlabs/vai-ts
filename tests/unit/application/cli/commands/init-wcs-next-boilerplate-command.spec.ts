import {faker} from '@faker-js/faker';

import {InitWCSNextBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-wcs-next-boilerplate-command';
import {InitBoilerplateOptions} from '../../../../../src/application/terminal/core/enums/init-boilerplate-options-enum';
import {RunnerOptions} from '../../../../../src/application/terminal/core/enums/runner-options-enum';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {TerminalMock} from '../../../__mocks__/application/terminal/services/terminal-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init WCS Next Boilerplate Command', () => {
  let command: InitWCSNextBoilerplateCommand;

  beforeEach(() => {
    command = new InitWCSNextBoilerplateCommand(
      RepositoryInteractorMock,
      TerminalMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize wcs next boilerplate successfully by npm', async () => {
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

    it('Should initialize wcs next boilerplate successfully by yarn', async () => {
      RepositoryInteractorMock.clone.mockResolvedValueOnce(undefined);
      TerminalMock.installNodePackages.mockResolvedValueOnce(undefined);
      ConsoleMock.envelope.mockReturnValue(undefined);

      await command.run([], {
        [InitBoilerplateOptions.PROJECT_NAME]: faker.lorem.word(),
        runner: RunnerOptions.YARN,
      });

      expect(ConsoleMock.envelope).toHaveBeenNthCalledWith(
        1,
        expect.any(String)
      );
    });
  });
});

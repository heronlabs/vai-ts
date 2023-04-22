import {faker} from '@faker-js/faker';

import {InitCronBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-cron-boilerplate-command';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init CRON Boilerplate Command', () => {
  let command: InitCronBoilerplateCommand;

  beforeEach(() => {
    command = new InitCronBoilerplateCommand(
      RepositoryInteractorMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize CRON boilerplate successfully by npm', async () => {
      RepositoryInteractorMock.clone.mockResolvedValueOnce(undefined);
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

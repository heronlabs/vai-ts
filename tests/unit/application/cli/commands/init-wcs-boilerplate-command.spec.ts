import {faker} from '@faker-js/faker';

import {InitWCSBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-wcs-boilerplate-command';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init WCS Boilerplate Command', () => {
  let command: InitWCSBoilerplateCommand;

  beforeEach(() => {
    command = new InitWCSBoilerplateCommand(
      RepositoryInteractorMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize wcs boilerplate successfully by npm', async () => {
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

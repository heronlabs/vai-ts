import {faker} from '@faker-js/faker';

import {InitPyBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-py-boilerplate-command';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init Py Boilerplate Command', () => {
  let command: InitPyBoilerplateCommand;

  beforeEach(() => {
    command = new InitPyBoilerplateCommand(
      RepositoryInteractorMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize py boilerplate successfully', async () => {
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

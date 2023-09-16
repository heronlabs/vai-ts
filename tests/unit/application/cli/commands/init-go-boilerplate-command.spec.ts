import {faker} from '@faker-js/faker';

import {InitGoBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-go-boilerplate-command';
import {ConsoleMock} from '../../../__mocks__/application/cli/presenters/console-mock';
import {RepositoryInteractorMock} from '../../../__mocks__/core/services/repository-interactor-mock';

describe('Given Init Go Boilerplate Command', () => {
  let command: InitGoBoilerplateCommand;

  beforeEach(() => {
    command = new InitGoBoilerplateCommand(
      RepositoryInteractorMock,
      ConsoleMock
    );
  });

  describe('Given run method', () => {
    it('Should initialize go boilerplate successfully', async () => {
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

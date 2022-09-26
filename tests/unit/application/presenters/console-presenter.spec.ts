import {faker} from '@faker-js/faker';

import {ConsolePresenter} from '../../../../src/application/cli/presenters/console-presenter';

describe('Given Console Presenter', () => {
  let presenter: ConsolePresenter;

  beforeEach(() => {
    presenter = new ConsolePresenter();
  });

  describe('Given envelope method', () => {
    it('Should log given message', async () => {
      const consoleLog = jest.spyOn(console, 'log').mockImplementation();

      const message = faker.lorem.words();

      presenter.envelope(message);

      expect(consoleLog).toHaveBeenNthCalledWith(
        1,
        `${ConsolePresenter.PREFIX}: ${message}`
      );
    });
  });
});

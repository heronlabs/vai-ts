import {faker} from '@faker-js/faker';
import * as cp from 'child_process';

import {Terminal} from '../../../../../../src/infrastructure/terminal/core/interfaces/terminal';
import {TerminalService} from '../../../../../../src/infrastructure/terminal/core/services/terminal-service';

describe('Given Terminal Service', () => {
  let service: Terminal;

  beforeEach(() => {
    service = new TerminalService();
  });

  describe('Given install node packages method', () => {
    it('Should install node packages in target directory', async () => {
      const execSpy = jest.spyOn(cp, 'execSync').mockImplementation();

      const targetDirectory = faker.lorem.words();

      await service.installNodePackages(targetDirectory);

      const execOptions = execSpy.mock.calls[0][1];
      expect(execOptions).toEqual({
        cwd: `./${targetDirectory}`,
        stdio: 'ignore',
      });
    });
  });
});

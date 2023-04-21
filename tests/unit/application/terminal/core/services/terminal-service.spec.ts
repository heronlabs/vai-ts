import {faker} from '@faker-js/faker';
import * as cp from 'child_process';

import {RunnerOptions} from '../../../../../../src/application/terminal/core/enums/runner-options-enum';
import {Terminal} from '../../../../../../src/application/terminal/core/interfaces/terminal';
import {TerminalService} from '../../../../../../src/application/terminal/core/services/terminal-service';

describe('Given Terminal Service', () => {
  let service: Terminal;

  beforeEach(() => {
    service = new TerminalService();
  });

  describe('Given install node packages method', () => {
    it('Should install node packages in target directory by npm', async () => {
      const execSpy = jest.spyOn(cp, 'execSync').mockImplementation();

      const targetDirectory = faker.lorem.words();

      await service.installNodePackages(targetDirectory, RunnerOptions.NPM);

      const execOptions = execSpy.mock.calls[0][1];
      expect(execOptions).toEqual({
        cwd: `./${targetDirectory}`,
        stdio: 'ignore',
      });
    });

    it('Should install node packages in target directory by yarn', async () => {
      const execSpy = jest.spyOn(cp, 'execSync').mockImplementation();

      const targetDirectory = faker.lorem.words();

      await service.installNodePackages(targetDirectory, RunnerOptions.YARN);

      const execOptions = execSpy.mock.calls[0][1];

      expect(execOptions).toEqual({
        cwd: `./${targetDirectory}`,
        stdio: 'ignore',
      });
    });
  });
});

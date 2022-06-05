import {Test} from '@nestjs/testing';
import {existsSync, mkdirSync, rmdirSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-boilerplate-command';
import {Command} from '../../../../../src/application/cli/interfaces/command';

describe('Given Init Boilerplate Command', () => {
  let command: Command;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitBoilerplateCommand);
  });

  beforeAll(() => {
    const path = './.temp/boilerplate';
    if (existsSync(path)) {
      rmdirSync(path, {recursive: true});
    } else {
      mkdirSync(path);
    }
  });

  it('Should run init boilerplate command', async () => {
    const output = await command.run();

    expect(output).toBeUndefined();
  });
});

import {Test} from '@nestjs/testing';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {VersionCommand} from '../../../../../src/application/cli/commands/version/version-command';
import {Commands} from '../../../../../src/application/cli/enums/commands';
import {Command} from '../../../../../src/application/cli/interfaces/command';

describe('Given Version Command', () => {
  let command: Command;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(VersionCommand);
  });

  it('Should match init boilerplate command name', () => {
    const name = command.getName();

    expect(name).toBe(Commands.VERSION);
  });

  it('Should run version command', async () => {
    jest.spyOn(console, 'log').mockImplementation();

    const output = await command.run();

    expect(output).toBeUndefined();
  });
});

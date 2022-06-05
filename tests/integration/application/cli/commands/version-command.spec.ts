import {Test} from '@nestjs/testing';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {VersionCommand} from '../../../../../src/application/cli/commands/version/version-command';
import {Command} from '../../../../../src/application/cli/interfaces/command';

describe('Given Version Command', () => {
  let command: Command;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(VersionCommand);
  });

  it('Should run version command', async () => {
    const output = await command.run();

    expect(output).toBeUndefined();
  });
});

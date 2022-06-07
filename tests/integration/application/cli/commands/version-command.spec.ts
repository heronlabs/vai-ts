import {Test} from '@nestjs/testing';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {VersionCommand} from '../../../../../src/application/cli/commands/version/version-command';

describe('Given Version Command', () => {
  let command: VersionCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(VersionCommand);
  });

  it('Should run version command', async () => {
    jest.spyOn(console, 'log').mockImplementation();

    const output = await command.run();

    expect(output).toBeUndefined();
  });
});

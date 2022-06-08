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
    const consoleLogSpy = jest.spyOn(console, 'log');

    await command.run();

    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, expect.any(String));
  });
});

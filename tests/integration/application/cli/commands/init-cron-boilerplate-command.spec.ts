import {Test} from '@nestjs/testing';
import {existsSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/dtos/init-boilerplate-options';
import {InitCronBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-cron-boilerplate-command';
import {BoilerplateFiles} from '../../../__factories__/boilerplate-files';
import {BoilerplatePrefix} from '../../../__factories__/boilerplate-prefix';

describe('Given Init Cron Boilerplate Command', () => {
  let command: InitCronBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitCronBoilerplateCommand);
  });

  it('Should run init boilerplate command with project name', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_CRON}`;

    await command.run([], {
      name: projectName,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

import {Test} from '@nestjs/testing';
import {existsSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitApiBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-api-boilerplate-command';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/init-boilerplate-options';
import {BoilerplateFiles} from '../../../__factories__/boilerplate-files';
import {BoilerplatePrefix} from '../../../__factories__/boilerplate-prefix';

describe('Given Api Basic Boilerplate Command', () => {
  let command: InitApiBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitApiBoilerplateCommand);
  });

  it('Should run init boilerplate command with project name', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_API}`;

    await command.run([], {
      projectName,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

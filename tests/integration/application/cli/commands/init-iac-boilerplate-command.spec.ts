import {Test} from '@nestjs/testing';
import {existsSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/init-boilerplate-options';
import {InitIacBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-iac-boilerplate-command';
import {BoilerplateFiles} from '../../../__factories__/boilerplate-files';
import {BoilerplatePrefix} from '../../../__factories__/boilerplate-prefix';

describe('Given Iac Basic Boilerplate Command', () => {
  let command: InitIacBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitIacBoilerplateCommand);
  });

  it('Should run init boilerplate command with project name', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_IAC}`;

    await command.run([], {
      projectName,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

import {Test} from '@nestjs/testing';
import {existsSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/dtos/init-boilerplate-options';
import {InitComponentBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-component-boilerplate-command';
import {BoilerplateFiles} from '../../../__factories__/boilerplate-files';
import {BoilerplatePrefix} from '../../../__factories__/boilerplate-prefix';

describe('Given Init Component Boilerplate Command', () => {
  let command: InitComponentBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitComponentBoilerplateCommand);
  });

  it('Should run init boilerplate command with project name', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_COMPONENT}`;

    await command.run([], {
      name: projectName,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

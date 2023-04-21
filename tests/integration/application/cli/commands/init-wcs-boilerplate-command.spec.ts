import {Test} from '@nestjs/testing';
import {existsSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitWCSBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-wcs-boilerplate-command';
import {RunnerOptions} from '../../../../../src/application/terminal/core/enums/runner-options-enum';
import {BoilerplateFiles} from '../../../__factories__/boilerplate-files';
import {BoilerplatePrefix} from '../../../__factories__/boilerplate-prefix';

describe('Given Init WCS Boilerplate Command', () => {
  let command: InitWCSBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitWCSBoilerplateCommand);
  });

  it('Should run init boilerplate command with project name by npm', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_WCS}-${RunnerOptions.NPM}`;

    await command.run([], {
      name: projectName,
      runner: RunnerOptions.NPM,
    });

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });

  it('Should run init boilerplate command with project name by yarn', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_WCS}-${RunnerOptions.YARN}`;

    await command.run([], {
      name: projectName,
      runner: RunnerOptions.YARN,
    });

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

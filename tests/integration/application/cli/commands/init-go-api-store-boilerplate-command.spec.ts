import {Test} from '@nestjs/testing';
import {existsSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitGoApiStoreBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-go-api-store-boilerplate-command';
import {BoilerplateFiles} from '../../../__factories__/boilerplate-files';
import {BoilerplatePrefix} from '../../../__factories__/boilerplate-prefix';

describe('Given Init Go Api Store Boilerplate Command', () => {
  let command: InitGoApiStoreBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitGoApiStoreBoilerplateCommand);
  });

  it('Should run init boilerplate command', async () => {
    const projectName = `${BoilerplateFiles.OUTPUT_FOLDER}/${BoilerplatePrefix.BOILERPLATE_GO_STORE_API}`;

    await command.run([], {
      name: projectName,
    });

    const isBoilerplateCreated = existsSync(`./${projectName}`);

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

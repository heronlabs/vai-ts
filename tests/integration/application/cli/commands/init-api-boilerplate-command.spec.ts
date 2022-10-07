import {Test} from '@nestjs/testing';
import {existsSync, rmdirSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitApiBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-api-boilerplate-command';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/init-boilerplate-options';
import {TempFoldersNames} from '../../../temp-folders-names';

describe('Given Api Basic Boilerplate Command', () => {
  let command: InitApiBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitApiBoilerplateCommand);
  });

  beforeAll(() => {
    [TempFoldersNames.API_BOILERPLATE].forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  it('Should run init boilerplate command with project name', async () => {
    await command.run([], {
      projectName: TempFoldersNames.API_BOILERPLATE,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(
      `./${TempFoldersNames.API_BOILERPLATE}`
    );

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

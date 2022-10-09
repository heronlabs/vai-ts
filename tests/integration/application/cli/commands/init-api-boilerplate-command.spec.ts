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
    [TempFoldersNames.BOILERPLATE_API].forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  it('Should run init boilerplate command with project name', async () => {
    await command.run([], {
      projectName: TempFoldersNames.BOILERPLATE_API,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(
      `./${TempFoldersNames.BOILERPLATE_API}`
    );

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

import {Test} from '@nestjs/testing';
import {existsSync, rmdirSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBasicBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-basic-boilerplate-command';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/init-boilerplate-options';
import {TempFoldersNames} from '../../../temp-folders-names';

describe('Given Init Basic Boilerplate Command', () => {
  let command: InitBasicBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitBasicBoilerplateCommand);
  });

  afterAll(() => {
    [TempFoldersNames.BOILERPLATE].forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  it('Should run init boilerplate command with project name', async () => {
    await command.run([], {
      projectName: TempFoldersNames.BOILERPLATE,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(
      `./${TempFoldersNames.BOILERPLATE}`
    );

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

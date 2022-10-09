import {Test} from '@nestjs/testing';
import {existsSync, rmdirSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/init-boilerplate-options';
import {InitIacBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-iac-boilerplate-command';
import {TempFoldersNames} from '../../../temp-folders-names';

describe('Given Iac Basic Boilerplate Command', () => {
  let command: InitIacBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitIacBoilerplateCommand);
  });

  beforeAll(() => {
    [TempFoldersNames.BOILERPLATE_IAC].forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  it('Should run init boilerplate command with project name', async () => {
    await command.run([], {
      projectName: TempFoldersNames.BOILERPLATE_IAC,
    } as InitBoilerplateAnswers);

    const isBoilerplateCreated = existsSync(
      `./${TempFoldersNames.BOILERPLATE_IAC}`
    );

    expect(isBoilerplateCreated).toBeTruthy();
  });
});

import {Test} from '@nestjs/testing';
import {existsSync, rmdirSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-boilerplate-command';
import {InitBoilerplateAnswers} from '../../../../../src/application/cli/commands/init/init-boilerplate-options';
import {TempFoldersNames} from '../../../temp-folders-names';

describe('Given Init Boilerplate Command', () => {
  let command: InitBoilerplateCommand;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitBoilerplateCommand);
  });

  afterAll(() => {
    [TempFoldersNames.BOILERPLATE].forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  it('Should run init boilerplate command with project name', async () => {
    const output = await command.run([], {
      projectName: TempFoldersNames.BOILERPLATE,
    } as InitBoilerplateAnswers);

    expect(output).toBeUndefined();
  });
});

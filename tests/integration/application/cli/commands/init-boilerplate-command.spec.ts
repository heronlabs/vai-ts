import {Test} from '@nestjs/testing';
import {existsSync, rmdirSync} from 'fs';

import {cliModule} from '../../../../../src/application/cli/cli-bootstrap';
import {InitBoilerplateCommand} from '../../../../../src/application/cli/commands/init/init-boilerplate-command';
import {InitBoilerplateQuestions} from '../../../../../src/application/cli/commands/init/init-boilerplate-questions';
import {Commands} from '../../../../../src/application/cli/enums/commands';
import {QuestionType} from '../../../../../src/application/cli/enums/question-type';
import {Command} from '../../../../../src/application/cli/interfaces/command';
import {Options} from '../../../../../src/application/cli/interfaces/options';
import {Question} from '../../../../../src/application/cli/interfaces/question/question';
import {InitBoilerplateAnswers} from '../../../../../src/application/terminal/answers/init-boilerplate-answers';
import {TempFoldersNames} from '../../../temp-folders-names';

describe('Given Init Boilerplate Command', () => {
  let command: Command & Options<InitBoilerplateQuestions>;
  const tempFolders: TempFoldersNames[] = [TempFoldersNames.BOILERPLATE];

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(cliModule).compile();
    command = moduleRef.get(InitBoilerplateCommand);
  });

  beforeAll(() => {
    tempFolders.forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  afterAll(() => {
    tempFolders.forEach(tempFolderName => {
      const path = `./${tempFolderName}`;
      if (existsSync(path)) rmdirSync(path, {recursive: true});
    });
  });

  it('Should match init boilerplate command name', () => {
    const name = command.getName();

    expect(name).toBe(Commands.INIT_BOILERPLATE);
  });

  it('Should get boilerplate questions', () => {
    const questions = command.getQuestions();

    expect(questions[0]).toEqual({
      name: InitBoilerplateQuestions.PROJECT_NAME,
      type: QuestionType.INPUT,
      message: expect.any(String),
      default: expect.any(String),
    } as Question<InitBoilerplateQuestions>);
  });

  it('Should run init boilerplate command', async () => {
    const answers: InitBoilerplateAnswers = {
      projectName: `./${TempFoldersNames.BOILERPLATE}`,
    };
    const output = await command.run(answers);

    expect(output).toBeUndefined();
  });
});

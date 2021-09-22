import {rmdirSync, readFileSync} from 'fs';
import {Mock} from 'moq.ts';
import {InitQuestions} from '../../../src/commands/init/init.questions';
import {Init} from '../../../src/commands/init/init.service';
import {travisConfig} from '../../../src/options/dev-ops/travis/templates/travis.template';
import {Travis} from '../../../src/options/dev-ops/travis/travis.service';
import {Skeleton} from '../../../src/options/skeleton/skeleton.service';
import {GTS} from '../../../src/options/third-parties/gts/gts.service';
import {Jest} from '../../../src/options/third-parties/jest/jest.service';
import {InfinityProgressFactory} from '../../../src/services/infinity-progress/infinity-progress.factory';
import {IPrint} from '../../../src/services/print/print.interface';
import {IPrompt} from '../../../src/services/prompt/prompt.interface';

describe('Given Init command', () => {
  const projectName = '__TEST__';
  jest
    .spyOn(InfinityProgressFactory, 'makeInfinityProgress')
    .mockImplementation(() => ({stop: jest.fn()}));

  const printMock = new Mock<IPrint>();
  printMock.setup(instance => instance.log).returns(jest.fn());
  const print = printMock.object();

  const promptMock = new Mock<IPrompt>();
  promptMock
    .setup(instance => instance.askQuestions)
    .returns(
      jest.fn().mockResolvedValue({
        [InitQuestions.PROJECT_NAME]: projectName,
        [InitQuestions.THIRD_PARTY_GTS]: true,
        [InitQuestions.THIRD_PARTY_JEST]: true,
        [InitQuestions.DEV_OPS_TRAVIS]: true,
      })
    );
  const prompt = promptMock.object();

  const gts = new GTS();
  const _jest = new Jest();
  const skeleton = new Skeleton();
  const travis = new Travis();

  const init = new Init(gts, _jest, travis, skeleton, print, prompt);

  beforeAll(async () => {
    await init.run();
  });

  afterAll(() => {
    rmdirSync(`${process.cwd()}/${projectName}`, {recursive: true});
  });

  it('Should initialize Skelton with package.json', () => {
    const packageJsonFile = {
      original: readFileSync(
        `${process.cwd()}/tests/commands/init/templates/package.json`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/package.json`
      ).toString(),
    };

    expect(packageJsonFile.original).toEqual(packageJsonFile.created);
  });

  it('Should initialize Skelton with .gitignore', () => {
    const gitIgnoreFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/skeleton/templates/.gitignore`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/.gitignore`
      ).toString(),
    };

    expect(gitIgnoreFile.original).toEqual(gitIgnoreFile.created);
  });

  it('Should initialize Travis with .travis.yml', () => {
    const travisFile = {
      original: travisConfig(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/.travis.yml`
      ).toString(),
    };

    expect(travisFile.original).toEqual(travisFile.created);
  });

  it('Should initialize GTS with .eslintignore', () => {
    const eslintIgnoreFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/third-parties/gts/templates/.eslintignore`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/.eslintignore`
      ).toString(),
    };

    expect(eslintIgnoreFile.original).toEqual(eslintIgnoreFile.created);
  });

  it('Should initialize GTS with .eslintrc.json', () => {
    const eslintrcJsonFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/third-parties/gts/templates/.eslintrc.json`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/.eslintrc.json`
      ).toString(),
    };

    expect(eslintrcJsonFile.original).toEqual(eslintrcJsonFile.created);
  });

  it('Should initialize GTS with .prettierrc.js', () => {
    const prettierrcFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/third-parties/gts/templates/.prettierrc.js`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/.prettierrc.js`
      ).toString(),
    };

    expect(prettierrcFile.original).toEqual(prettierrcFile.created);
  });

  it('Should initialize GTS with tsconfig.json', () => {
    const tsConfigFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/third-parties/gts/templates/tsconfig.json`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/tsconfig.json`
      ).toString(),
    };

    expect(tsConfigFile.original).toEqual(tsConfigFile.created);
  });

  it('Should initialize Jest with jest.config.js', () => {
    const jestConfigFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/third-parties/jest/templates/jest.config.js`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/jest.config.js`
      ).toString(),
    };

    expect(jestConfigFile.original).toEqual(jestConfigFile.created);
  });

  it('Should initialize Jest with jest.setup-file.ts', () => {
    const jestSetupFile = {
      original: readFileSync(
        `${process.cwd()}/src/options/third-parties/jest/templates/jest.setup-file.ts`
      ).toString(),
      created: readFileSync(
        `${process.cwd()}/${projectName}/jest.setup-file.ts`
      ).toString(),
    };

    expect(jestSetupFile.original).toEqual(jestSetupFile.created);
  });
});

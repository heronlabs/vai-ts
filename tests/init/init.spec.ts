import {Mock} from 'moq.ts';
import {InitQuestions} from '../../src/commands/init/init.questions';
import {Init} from '../../src/commands/init/init.service';
import {Travis} from '../../src/options/dev-ops/travis/travis.service';
import {Skeleton} from '../../src/options/skeleton/skeleton.service';
import {GTS} from '../../src/options/third-parties/gts/gts.service';
import {Jest} from '../../src/options/third-parties/jest/jest.service';
import {InfinityProgressFactory} from '../../src/services/infinity-progress/infinity-progress.factory';
import {IPrint} from '../../src/services/print/print.interface';
import {IPrompt} from '../../src/services/prompt/prompt.interface';
import {readFileSync, rmdirSync} from 'fs';

describe('Given Init service', () => {
  const projectName = '__TEST__';

  beforeAll(() => {
    rmdirSync(`${process.cwd()}/${projectName}`, {recursive: true});
  });

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

  it('Should initialize all resources', async () => {
    const skeletonTemplates = {
      package: readFileSync(
        `${process.cwd()}/tests/init/templates/package.json`
      ),
      gitIgnore: readFileSync(
        `${process.cwd()}/src/options/skeleton/templates/.gitignore`
      ),
      index: readFileSync(
        `${process.cwd()}/src/options/skeleton/templates/src/index.ts`
      ),
      launch: readFileSync(
        `${process.cwd()}/src/options/skeleton/templates/.vscode/launch.json`
      ),
    };

    await init.run();

    const createdTemplates = {
      package: readFileSync(`${process.cwd()}/${projectName}/package.json`),
      gitIgnore: readFileSync(`${process.cwd()}/${projectName}/.gitignore`),
      index: readFileSync(`${process.cwd()}/${projectName}/src/index.ts`),
      launch: readFileSync(
        `${process.cwd()}/${projectName}/.vscode/launch.json`
      ),
    };

    expect(skeletonTemplates.index.equals(createdTemplates.index)).toBeTruthy();
    expect(
      skeletonTemplates.launch.equals(createdTemplates.launch)
    ).toBeTruthy();
    expect(skeletonTemplates.package.toString()).toEqual(
      skeletonTemplates.package.toString()
    );
    expect(
      skeletonTemplates.gitIgnore.equals(createdTemplates.gitIgnore)
    ).toBeTruthy();
  });
});

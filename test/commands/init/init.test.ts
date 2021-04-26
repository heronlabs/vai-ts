import {Command} from '../../../src/commands/command.enum';
import {Init} from '../../../src/commands/init/init.service';
import {Mock} from 'moq.ts';
import {Skeleton} from '../../../src/commands/init/skeleton.service';
import {Babel} from '../../../src/commands/init/third-parties/babel.service';
import {Git} from '../../../src/commands/init/third-parties/git.service';
import {GTS} from '../../../src/commands/init/third-parties/gts.service';
import {Jest} from '../../../src/commands/init/third-parties/jest.service';
import {Travis} from '../../../src/commands/init/third-parties/travis.service';
import {InitOptions} from '../../../src/commands/init/options.enum';

describe('Init', () => {
  const babelMock = new Mock<Babel>();
  babelMock.setup(instance => instance.createBabelFile).returns(jest.fn());
  const babel = babelMock.object();

  const gitMock = new Mock<Git>();
  gitMock.setup(instance => instance.createGitIgnoreFile).returns(jest.fn());
  const git = gitMock.object();

  const gtsMock = new Mock<GTS>();
  gtsMock.setup(instance => instance.createESLintFiles).returns(jest.fn());
  gtsMock.setup(instance => instance.createPrettierFile).returns(jest.fn());
  gtsMock.setup(instance => instance.createTsConfigFile).returns(jest.fn());
  const gts = gtsMock.object();

  const jestMock = new Mock<Jest>();
  jestMock.setup(instance => instance.createJestConfigFile).returns(jest.fn());
  jestMock.setup(instance => instance.createJestSetup).returns(jest.fn());
  const _jest = jestMock.object();

  const travisMock = new Mock<Travis>();
  travisMock.setup(instance => instance.createTravisFile).returns(jest.fn());
  const travis = travisMock.object();

  const skeletonMock = new Mock<Skeleton>();
  skeletonMock
    .setup(instance => instance.createProjectFolder)
    .returns(jest.fn());
  skeletonMock.setup(instance => instance.createPackageFile).returns(jest.fn());
  skeletonMock
    .setup(instance => instance.installDependencies)
    .returns(jest.fn());
  const skeleton = skeletonMock.object();

  const init = new Init(babel, git, gts, _jest, travis, skeleton);

  describe('Run', () => {
    const run = async (options: string[], projectName: string) => {
      const skeletonCreateProjectFolderSpy = jest
        .spyOn(skeleton, 'createProjectFolder')
        .mockImplementation();
      const skeletonCreatePackageFileSpy = jest
        .spyOn(skeleton, 'createPackageFile')
        .mockImplementation();
      const skeletonInstallDependenciesSpy = jest
        .spyOn(skeleton, 'installDependencies')
        .mockImplementation();
      const babelCreateBabelFileSpy = jest
        .spyOn(babel, 'createBabelFile')
        .mockImplementation();
      const gitCreateGitIgnoreFileSpy = jest
        .spyOn(git, 'createGitIgnoreFile')
        .mockImplementation();
      const gtsCreateESLintFilesSpy = jest
        .spyOn(gts, 'createESLintFiles')
        .mockImplementation();
      const gtsCreatePrettierFileSpy = jest
        .spyOn(gts, 'createPrettierFile')
        .mockImplementation();
      const gtsCreateTsConfigFileSpy = jest
        .spyOn(gts, 'createTsConfigFile')
        .mockImplementation();
      const _jestCreateJestConfigFileSpy = jest
        .spyOn(_jest, 'createJestConfigFile')
        .mockImplementation();
      const _jestCreateJestSetupSpy = jest
        .spyOn(_jest, 'createJestSetup')
        .mockImplementation();
      const travisCreateTravisFileSpy = jest
        .spyOn(travis, 'createTravisFile')
        .mockImplementation();

      await init.run(options);

      expect(skeletonCreateProjectFolderSpy).toHaveBeenCalledWith(projectName);
      expect(skeletonCreatePackageFileSpy).toHaveBeenCalledWith(projectName);
      expect(skeletonInstallDependenciesSpy).toHaveBeenCalledWith(projectName);
      expect(babelCreateBabelFileSpy).toHaveBeenCalledWith(projectName);
      expect(gitCreateGitIgnoreFileSpy).toHaveBeenCalledWith(projectName);
      expect(gtsCreateESLintFilesSpy).toHaveBeenCalledWith(projectName);
      expect(gtsCreatePrettierFileSpy).toHaveBeenCalledWith(projectName);
      expect(gtsCreateTsConfigFileSpy).toHaveBeenCalledWith(projectName);
      expect(_jestCreateJestConfigFileSpy).toHaveBeenCalledWith(projectName);
      expect(_jestCreateJestSetupSpy).toHaveBeenCalledWith(projectName);
      expect(travisCreateTravisFileSpy).toHaveBeenCalledWith(projectName);
    };

    it('Should run with my-test-project', async () => {
      const options = ['--name=my-test-project'];

      await run(options, 'my-test-project');
    });

    it('Should run with my-project', async () => {
      const options = [''];

      await run(options, 'my-project');
    });
  });

  describe('Whoami', () => {
    it('Should return whoami', () => {
      const whoami = init.whoami;

      expect(whoami).toBe(Command.init);
    });
  });

  describe('Get Options', () => {
    it('Should return options', () => {
      const currentOptions = Object.values(InitOptions);

      const options = init.getOptions().toString();

      expect(options).toBe(currentOptions.toString());
    });
  });
});

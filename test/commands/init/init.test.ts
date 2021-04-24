import {Command} from '../../../src/commands/command.enum';
import {Init} from '../../../src/commands/init/init.service';
import {Mock} from 'moq.ts';
import {Struct} from '../../../src/commands/init/struct.service';
import {Babel} from '../../../src/commands/init/babel.service';
import {Git} from '../../../src/commands/init/git.service';
import {GTS} from '../../../src/commands/init/gts.service';
import {Jest} from '../../../src/commands/init/jest.service';
import {Travis} from '../../../src/commands/init/travis.service';
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

  const structMock = new Mock<Struct>();
  structMock.setup(instance => instance.createProjectFolder).returns(jest.fn());
  structMock.setup(instance => instance.createPackageFile).returns(jest.fn());
  structMock.setup(instance => instance.installDependencies).returns(jest.fn());
  const struct = structMock.object();

  const travisMock = new Mock<Travis>();
  travisMock.setup(instance => instance.createTravisFile).returns(jest.fn());
  const travis = travisMock.object();

  const init = new Init(babel, git, gts, _jest, struct, travis);

  describe('Run', () => {
    const run = async (options: string[], projectName: string) => {
      const structCreateProjectFolderSpy = jest
        .spyOn(struct, 'createProjectFolder')
        .mockImplementation();
      const structCreatePackageFileSpy = jest
        .spyOn(struct, 'createPackageFile')
        .mockImplementation();
      const structInstallDependenciesSpy = jest
        .spyOn(struct, 'installDependencies')
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

      expect(structCreateProjectFolderSpy).toHaveBeenCalledWith(projectName);
      expect(structCreatePackageFileSpy).toHaveBeenCalledWith(projectName);
      expect(structInstallDependenciesSpy).toHaveBeenCalledWith(projectName);
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

import {Command} from '../../../src/commands/command.enum';
import {Init} from '../../../src/commands/init/init.service';
import {Mock} from 'moq.ts';
import {Struct} from '../../../src/commands/init/struct.service';
import {Babel} from '../../../src/commands/init/babel.service';
import {Git} from '../../../src/commands/init/git.service';
import {GTS} from '../../../src/commands/init/gts.service';
import {Jest} from '../../../src/commands/init/jest.service';
import {Travis} from '../../../src/commands/init/travis.service';

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
    it('Should run with current directory name', async () => {
      const currentDir = 'vai-ts';

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

      await init.run();

      expect(structCreateProjectFolderSpy).toHaveBeenCalledWith(currentDir);
      expect(structCreatePackageFileSpy).toHaveBeenCalledWith(currentDir);
      expect(structInstallDependenciesSpy).toHaveBeenCalledWith(currentDir);
      expect(babelCreateBabelFileSpy).toHaveBeenCalledWith(currentDir);
      expect(gitCreateGitIgnoreFileSpy).toHaveBeenCalledWith(currentDir);
      expect(gtsCreateESLintFilesSpy).toHaveBeenCalledWith(currentDir);
      expect(gtsCreatePrettierFileSpy).toHaveBeenCalledWith(currentDir);
      expect(gtsCreateTsConfigFileSpy).toHaveBeenCalledWith(currentDir);
      expect(_jestCreateJestConfigFileSpy).toHaveBeenCalledWith(currentDir);
      expect(_jestCreateJestSetupSpy).toHaveBeenCalledWith(currentDir);
      expect(travisCreateTravisFileSpy).toHaveBeenCalledWith(currentDir);
    });

    it('Should run with default directory name', async () => {
      const currentDir = 'my-project';
      const processCwdSpy = jest
        .spyOn(process, 'cwd')
        .mockImplementation()
        .mockReturnValue('');

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

      await init.run();

      expect(structCreateProjectFolderSpy).toHaveBeenCalledWith(currentDir);
      expect(structCreatePackageFileSpy).toHaveBeenCalledWith(currentDir);
      expect(structInstallDependenciesSpy).toHaveBeenCalledWith(currentDir);
      expect(babelCreateBabelFileSpy).toHaveBeenCalledWith(currentDir);
      expect(gitCreateGitIgnoreFileSpy).toHaveBeenCalledWith(currentDir);
      expect(gtsCreateESLintFilesSpy).toHaveBeenCalledWith(currentDir);
      expect(gtsCreatePrettierFileSpy).toHaveBeenCalledWith(currentDir);
      expect(gtsCreateTsConfigFileSpy).toHaveBeenCalledWith(currentDir);
      expect(_jestCreateJestConfigFileSpy).toHaveBeenCalledWith(currentDir);
      expect(_jestCreateJestSetupSpy).toHaveBeenCalledWith(currentDir);
      expect(travisCreateTravisFileSpy).toHaveBeenCalledWith(currentDir);

      expect(processCwdSpy).toHaveBeenCalled();
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
      const currentOptions = ['', '-y,--yes'];

      const options = init.getOptions().toString();

      expect(options).toBe(currentOptions.toString());
    });
  });
});

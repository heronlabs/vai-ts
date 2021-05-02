import * as cp from '../../../src/lib/exec';
import * as fs from 'fs';

import {
  indexConfig,
  packageConfig,
} from '../../../src/templates/skeleton/package.template';

import {Skeleton} from '../../../src/commands/init/skeleton.service';

describe('Skeleton', () => {
  it('Should create project folder', async () => {
    const skeleton = new Skeleton();
    const projectName = 'project';
    const execSpy = jest.spyOn(cp, 'exec').mockImplementation();

    await skeleton.createProjectFolder(projectName);

    expect(execSpy).toHaveBeenCalledWith(`mkdir ${projectName}`);
  });

  it('Should create package.json', async () => {
    const skeleton = new Skeleton();
    const projectName = 'project';
    const packageConfigFile = packageConfig(projectName);
    const execSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    skeleton.createPackageFile(projectName);

    expect(execSpy).toHaveBeenCalledWith(
      `${projectName}/package.json`,
      packageConfigFile
    );
  });

  it('Should install dependencies', async () => {
    const skeleton = new Skeleton();
    const projectName = 'project';
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await skeleton.installDependencies(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(projectName, 'yarn');
  });

  it('Should create index file', () => {
    const skeleton = new Skeleton();
    const projectName = 'project';
    const packageConfigFile = indexConfig();
    const execSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    skeleton.createIndexFile(projectName);

    expect(execSpy).toHaveBeenCalledWith(
      `${projectName}/src/index.ts`,
      packageConfigFile
    );
  });
});

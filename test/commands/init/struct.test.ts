import * as cp from '../../../src/lib/exec';
import * as fs from 'fs';

import {Struct} from '../../../src/commands/init/struct.service';
import {packageConfig} from '../../../src/templates/struct/package.template';

describe('Struct', () => {
  it('Should create project folder', async () => {
    const struct = new Struct();
    const projectName = 'project';
    const execSpy = jest.spyOn(cp, 'exec').mockImplementation();

    await struct.createProjectFolder(projectName);

    expect(execSpy).toHaveBeenCalledWith(`mkdir ${projectName}`);
  });

  it('Should create package.json', async () => {
    const struct = new Struct();
    const projectName = 'project';
    const packageConfigFile = packageConfig(projectName);
    const execSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    await struct.createPackageFile(projectName);

    expect(execSpy).toHaveBeenCalledWith(
      `${projectName}/package.json`,
      packageConfigFile
    );
  });

  it('Should install dependencies', async () => {
    const struct = new Struct();
    const projectName = 'project';
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await struct.installDependencies(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(projectName, 'yarn');
  });
});

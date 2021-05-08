import * as cp from '../../../lib/exec';
import * as fs from 'fs';

import {indexConfig, packageConfig} from './package.template';

import {Skeleton} from './skeleton.service';
import {gitIgnoreConfig} from './gitignore.template';
import {vsCodeDebuggerConfig} from './vscode-debugger.template';

describe('Skeleton', () => {
  it('Should create project folder', async () => {
    const skeleton = new Skeleton();
    const projectName = 'project';
    const execSpy = jest.spyOn(cp, 'exec').mockImplementation();

    await skeleton.createProjectFolder(projectName);

    expect(execSpy).toHaveBeenNthCalledWith(1, `mkdir ${projectName}`);
    expect(execSpy).toHaveBeenNthCalledWith(2, `mkdir ${projectName}/src`);
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

  it('Should create Git Ignore file', async () => {
    const skeleton = new Skeleton();
    const gitIgnoreFile = gitIgnoreConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    skeleton.createGitIgnoreFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.gitignore`,
      gitIgnoreFile
    );
  });

  it('Should create Visual Studio Code Debugger config file', async () => {
    const skeleton = new Skeleton();
    const vsCodeDebuggerConfigFile = vsCodeDebuggerConfig();
    const projectFolder = 'project';
    const execSpy = jest.spyOn(cp, 'exec').mockImplementation();
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    await skeleton.createVsCodeDebuggerFile(projectFolder);

    expect(execSpy).toHaveBeenCalledWith(`mkdir ${projectFolder}/.vscode`);
    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.vscode/launch.json`,
      vsCodeDebuggerConfigFile
    );
  });
});

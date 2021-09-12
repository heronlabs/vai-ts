import * as cp from '../../utils/exec';
import * as fs from 'fs';

import {InfinityProgressFactory} from '../../services/infinity-progress/infinity-progress.factory';
import {Skeleton} from './skeleton.service';

import path = require('path');

describe('Skeleton', () => {
  jest
    .spyOn(InfinityProgressFactory, 'makeInfinityProgress')
    .mockImplementation(() => ({stop: jest.fn()}));

  const skeleton = new Skeleton();
  const projectName = 'project';

  it('Should create project folder', async () => {
    const execSpy = jest.spyOn(cp, 'exec').mockImplementation();

    await skeleton.createProjectFolder(projectName);

    expect(execSpy).toHaveBeenCalledWith(`mkdir ${projectName}`);
  });

  it('Should move skeleton templates', async () => {
    const templatesFolder = '/user/templates';
    jest.spyOn(path, 'join').mockReturnValue(templatesFolder);
    const copyInProjectFolderSpy = jest
      .spyOn(cp, 'copyInProjectFolder')
      .mockImplementation();

    await skeleton.moveSkeletonTemplates(projectName);

    expect(copyInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      templatesFolder
    );
  });

  describe('Should rename project name in package.json', () => {
    const packageJson = {
      name: 'to-be-replace',
    };

    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation()
      .mockReturnValue(JSON.stringify(packageJson));

    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation();

    it('Should read package.json for add scripts', () => {
      skeleton.replacePackageName(projectName);

      expect(readFileSyncSpy).toHaveBeenCalledWith(
        `${projectName}/package.json`,
        'utf8'
      );
    });

    it('Should replace project name in package.json', () => {
      skeleton.replacePackageName(projectName);

      const updatedPackageFile = {
        name: 'project',
      };

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        `${projectName}/package.json`,
        JSON.stringify(updatedPackageFile, null, 2)
      );
    });
  });

  it('Should install dependencies', async () => {
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await skeleton.installDependencies(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(projectName, 'yarn');
  });

  it('Should implement the init command', async () => {
    const createProjectFolderSpy = jest
      .spyOn(skeleton, 'createProjectFolder')
      .mockImplementation();
    const moveSkeletonTemplatesSpy = jest
      .spyOn(skeleton, 'moveSkeletonTemplates')
      .mockImplementation();
    const replacePackageNameSpy = jest
      .spyOn(skeleton, 'replacePackageName')
      .mockImplementation();
    const installDependenciesSpy = jest
      .spyOn(skeleton, 'installDependencies')
      .mockImplementation();

    await skeleton.init(projectName);

    expect(createProjectFolderSpy).toHaveBeenCalledWith(projectName);
    expect(moveSkeletonTemplatesSpy).toHaveBeenCalledWith(projectName);
    expect(replacePackageNameSpy).toHaveBeenCalledWith(projectName);
    expect(installDependenciesSpy).toHaveBeenCalledWith(projectName);
  });
});

import * as cp from '../../utils/exec';
import * as fs from 'fs';

import {Jest} from './jest.service';

import path = require('path');

describe('Jest', () => {
  const _jest = new Jest();
  const projectName = 'project';

  it('Should install Jest dependencies', async () => {
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await _jest.installJest(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      'yarn add -D @types/jest babel-jest jest jest-junit ts-jest moq.ts codecov winston'
    );
  });

  it('Should move Jest templates', async () => {
    const templatesFolder = '/user/templates';
    jest.spyOn(path, 'join').mockReturnValue(templatesFolder);
    const copyInProjectFolderSpy = jest
      .spyOn(cp, 'copyInProjectFolder')
      .mockImplementation();

    await _jest.moveJestTemplates(projectName);

    expect(copyInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      templatesFolder
    );
  });

  describe('Should add scripts in package.json', () => {
    const packageJson = {
      scripts: {
        lint: 'echo lint',
      },
    };

    const readFileSyncSpy = jest
      .spyOn(fs, 'readFileSync')
      .mockImplementation()
      .mockReturnValue(JSON.stringify(packageJson));

    const writeFileSyncSpy = jest
      .spyOn(fs, 'writeFileSync')
      .mockImplementation();

    it('Should read package.json for add scripts', () => {
      _jest.addJestScripts(projectName);

      expect(readFileSyncSpy).toHaveBeenCalledWith(
        `${projectName}/package.json`,
        'utf8'
      );
    });

    it('Should write package.json with new scripts', () => {
      _jest.addJestScripts(projectName);

      const updatedPackageFile = {
        scripts: {
          lint: 'echo lint',
          test:
            'npx jest --runInBand --detectOpenHandles --colors --verbose --reporters=default',
          'test-watch': 'yarn test --watch',
          'test-coverage': 'yarn test --coverage',
          'test-coverage-upload': 'yarn test-coverage && codecov',
        },
      };

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        `${projectName}/package.json`,
        JSON.stringify(updatedPackageFile, null, 2)
      );
    });
  });

  it('Should implement the init command', async () => {
    const installJestSpy = jest
      .spyOn(_jest, 'installJest')
      .mockImplementation();
    const moveJestTemplatesSpy = jest
      .spyOn(_jest, 'moveJestTemplates')
      .mockImplementation();
    const addJestScriptsSpy = jest
      .spyOn(_jest, 'addJestScripts')
      .mockImplementation();

    await _jest.init(projectName);

    expect(moveJestTemplatesSpy).toHaveBeenCalledWith(projectName);
    expect(installJestSpy).toHaveBeenCalledWith(projectName);
    expect(addJestScriptsSpy).toHaveBeenCalledWith(projectName);
  });
});

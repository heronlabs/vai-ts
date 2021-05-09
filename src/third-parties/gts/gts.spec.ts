import * as cp from '../../utils/exec';
import * as fs from 'fs';

import {GTS} from './gts.service';

import path = require('path');

describe('GTS', () => {
  const gts = new GTS();
  const projectName = 'project';

  it('Should install GTS dependencies', async () => {
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await gts.installGTS(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      'yarn add -D gts'
    );
  });

  it('Should move GTS templates', async () => {
    const templatesFolder = '/user/templates';
    jest.spyOn(path, 'join').mockReturnValue(templatesFolder);
    const copyInProjectFolderSpy = jest
      .spyOn(cp, 'copyInProjectFolder')
      .mockImplementation();

    await gts.moveGTSTemplates(projectName);

    expect(copyInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      templatesFolder
    );
  });

  describe('Should add scripts in package.json', () => {
    const packageJson = {
      scripts: {
        test: 'echo teste',
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
      gts.addGTSScripts(projectName);

      expect(readFileSyncSpy).toHaveBeenCalledWith(
        `${projectName}/package.json`,
        'utf8'
      );
    });

    it('Should write package.json with new scripts', () => {
      gts.addGTSScripts(projectName);

      const updatedPackageFile = {
        scripts: {
          test: 'echo teste',
          lint: 'gts lint',
          'lint-clean': 'gts clean',
          'lint-fix': 'gts fix',
        },
      };

      expect(writeFileSyncSpy).toHaveBeenCalledWith(
        `${projectName}/package.json`,
        JSON.stringify(updatedPackageFile, null, 2)
      );
    });
  });

  it('Should implement the init command', async () => {
    const installGTSSpy = jest.spyOn(gts, 'installGTS').mockImplementation();
    const moveGTSTemplatesSpy = jest
      .spyOn(gts, 'moveGTSTemplates')
      .mockImplementation();
    const addGTSScriptsSpy = jest
      .spyOn(gts, 'addGTSScripts')
      .mockImplementation();

    await gts.init(projectName);

    expect(moveGTSTemplatesSpy).toHaveBeenCalledWith(projectName);
    expect(installGTSSpy).toHaveBeenCalledWith(projectName);
    expect(addGTSScriptsSpy).toHaveBeenCalledWith(projectName);
  });
});

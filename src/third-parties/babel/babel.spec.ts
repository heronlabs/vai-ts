import * as cp from '../../lib/exec';

import {Babel} from './babel.service';

import path = require('path');

describe('Babel', () => {
  const babel = new Babel();
  const projectName = 'project';

  it('Should install babel dependencies', async () => {
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await babel.installBabel(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      'yarn add -D @babel/core @babel/preset-env @babel/preset-typescript @babel/register'
    );
  });

  it('Should move Babel file', async () => {
    const templatesFolder = '/user/templates';
    jest.spyOn(path, 'join').mockReturnValue(templatesFolder);
    const copyInProjectFolderSpy = jest
      .spyOn(cp, 'copyInProjectFolder')
      .mockImplementation();

    await babel.moveBabelTemplates(projectName);

    expect(copyInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      templatesFolder
    );
  });

  it('Should implement the init command', async () => {
    const moveBabelTemplatesSpy = jest
      .spyOn(babel, 'moveBabelTemplates')
      .mockImplementation();
    const installBabelSpy = jest
      .spyOn(babel, 'installBabel')
      .mockImplementation();

    await babel.init(projectName);

    expect(moveBabelTemplatesSpy).toHaveBeenCalledWith(projectName);
    expect(installBabelSpy).toHaveBeenCalledWith(projectName);
  });
});

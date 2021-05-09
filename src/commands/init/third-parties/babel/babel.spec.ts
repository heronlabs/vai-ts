import * as cp from '../../../../lib/exec';

import {Babel} from './babel.service';

import path = require('path');

describe('Babel', () => {
  const babel = new Babel();
  const projectName = 'project';

  it('Should move Babel file', async () => {
    const templatesFolder = '/user/templates';
    jest.spyOn(path, 'join').mockReturnValue(templatesFolder);
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    babel.moveBabelTemplates(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      `cp ${templatesFolder}/* ./`
    );
  });

  it('Should install babel dependencies', async () => {
    const execInProjectFolderSpy = jest
      .spyOn(cp, 'execInProjectFolder')
      .mockImplementation();

    await babel.installBabel(projectName);

    expect(execInProjectFolderSpy).toHaveBeenCalledWith(
      projectName,
      'yarn add @babel/core @babel/preset-env @babel/preset-typescript @babel/register'
    );
  });
});

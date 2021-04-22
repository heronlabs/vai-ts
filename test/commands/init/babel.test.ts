import * as fs from 'fs';

import {Babel} from '../../../src/commands/init/babel.service';
import {babelConfig} from '../../../src/templates/babel/babel.template';

describe('Babel', () => {
  it('Should create Babel file', async () => {
    const babelConfigFile = babelConfig();
    const projectFolder = 'project';
    const babel = new Babel();
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    babel.createBabelFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/babel.config.js`,
      babelConfigFile
    );
  });
});

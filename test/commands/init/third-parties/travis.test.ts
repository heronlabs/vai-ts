import * as fs from 'fs';

import {Travis} from '../../../../src/commands/init/third-parties/travis.service';
import {travisConfig} from '../../../../src/templates/travis/travis.template';

describe('Travis', () => {
  it('Should create Travis config file', async () => {
    const travis = new Travis();
    const travisConfigFile = travisConfig();
    const projectFolder = 'project';
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    travis.createTravisFile(projectFolder);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectFolder}/.travis.yml`,
      travisConfigFile
    );
  });
});

import * as fs from 'fs';

import {Travis} from './travis.service';
import {travisConfig} from './templates/travis.template';

describe('Travis', () => {
  const travis = new Travis();
  const projectName = 'project';

  it('Should create Travis config file', async () => {
    const travisConfigFile = travisConfig();
    const writeFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation();

    travis.createTravisFile(projectName);

    expect(writeFileSync).toHaveBeenCalledWith(
      `${projectName}/.travis.yml`,
      travisConfigFile
    );
  });

  it('Should implement the init command', async () => {
    const createTravisFileSpy = jest
      .spyOn(travis, 'createTravisFile')
      .mockImplementation();

    await travis.init(projectName);

    expect(createTravisFileSpy).toHaveBeenCalledWith(projectName);
  });
});

import * as fs from 'fs';

import {InfinityProgressFactory} from '../../../services/infinity-progress/infinity-progress.factory';
import {Travis} from './travis.service';
import {travisConfig} from './templates/travis.template';

describe('Travis', () => {
  jest
    .spyOn(InfinityProgressFactory, 'makeInfinityProgress')
    .mockImplementation(() => ({stop: jest.fn()}));

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

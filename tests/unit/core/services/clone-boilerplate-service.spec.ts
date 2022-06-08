import faker from '@faker-js/faker';
import {AxiosResponse} from 'axios';
import axios from 'axios';
import * as fs from 'fs';
import {Mock} from 'moq.ts';
import * as unzipper from 'unzipper';
import {ParseStream} from 'unzipper';

import {RepositoryEntity} from '../../../../src/core/entities/repository-entity';
import {CloneGit} from '../../../../src/core/interfaces/clone-git';
import {CloneBoilerplateService} from '../../../../src/core/services/clone-boilerplate-service';

describe('Given Clone Boilerplate Service', () => {
  let service: CloneGit;

  beforeEach(() => {
    service = new CloneBoilerplateService();
  });

  describe('Given clone method', () => {
    it('Should download repository in target directory', async () => {
      const repositoryZip = Buffer.from(faker.lorem.words());
      const axiosResponse = new Mock<AxiosResponse<Buffer>>()
        .setup(mock => mock.data)
        .returns(repositoryZip)
        .object();
      jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      const parseStreamMoq = new Mock<ParseStream>();

      const parseStreamMock = {
        promise: jest.fn().mockResolvedValueOnce(undefined),
        on: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
        once: jest.fn(),
        emit: jest.fn(),
      };

      parseStreamMoq
        .setup(mock => mock.promise)
        .returns(parseStreamMock.promise)
        .setup(mock => mock.on)
        .returns(parseStreamMock.on)
        .setup(mock => mock.write)
        .returns(parseStreamMock.write)
        .setup(mock => mock.end)
        .returns(parseStreamMock.end)
        .setup(mock => mock.once)
        .returns(parseStreamMock.once)
        .setup(mock => mock.emit)
        .returns(parseStreamMock.emit);

      jest
        .spyOn(unzipper, 'Extract')
        .mockImplementation(() => parseStreamMoq.object());

      jest.spyOn(fs, 'renameSync').mockImplementation();

      const boilerplateRepository = RepositoryEntity.make(
        faker.lorem.words(),
        faker.internet.url(),
        faker.lorem.words()
      );
      const targetDirectory = faker.lorem.words();

      const success = await service.clone(
        targetDirectory,
        boilerplateRepository
      );

      expect(success).toBeTruthy();
    });
  });
});

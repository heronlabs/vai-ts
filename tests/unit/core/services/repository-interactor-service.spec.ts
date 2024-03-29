import {faker} from '@faker-js/faker';
import axios, {AxiosResponse} from 'axios';
import * as fs from 'fs';
import {Mock} from 'moq.ts';
import * as unzipper from 'unzipper';
import {ParseStream} from 'unzipper';

import {RepositoryEntity} from '../../../../src/core/entities/repository-entity';
import {RepositoryInteractor} from '../../../../src/core/interfaces/repository-interactor';
import {RepositoryInteractorService} from '../../../../src/core/services/repository-interactor-service';

describe('Given Repository Interactor Service', () => {
  let service: RepositoryInteractor;

  beforeEach(() => {
    service = new RepositoryInteractorService();
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

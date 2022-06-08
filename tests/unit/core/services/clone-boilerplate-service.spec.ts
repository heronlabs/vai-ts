import faker from '@faker-js/faker';
import {AxiosResponse} from 'axios';
import axios from 'axios';
import * as fs from 'fs';
import {Mock} from 'moq.ts';

import {RepositoryEntity} from '../../../../src/core/entities/repository-entity';
import {ZipReadableEntity} from '../../../../src/core/entities/zip-readable-entity';
import {CloneGit} from '../../../../src/core/interfaces/clone-git';
import {CloneBoilerplateService} from '../../../../src/core/services/clone-boilerplate-service';
import {parseStreamMock, readableMoq} from '../../__mocks__/readable-mock';

describe('Given Clone Boilerplate Service', () => {
  let service: CloneGit;

  beforeEach(() => {
    service = new CloneBoilerplateService();
  });

  describe('Given clone method', () => {
    it('Should download repository in target directory', async () => {
      const repositoryZip = new Mock<Buffer>().object();
      const axiosResponse = new Mock<AxiosResponse<Buffer>>()
        .setup(mock => mock.data)
        .returns(repositoryZip)
        .object();
      jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      parseStreamMock.promise.mockResolvedValueOnce(undefined);

      jest
        .spyOn(ZipReadableEntity, 'make')
        .mockReturnValue(readableMoq.object());

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

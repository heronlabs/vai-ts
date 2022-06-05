import faker from '@faker-js/faker';
import {AxiosResponse} from 'axios';
import axios from 'axios';
import * as cp from 'child_process';
import * as fs from 'fs';
import {Mock} from 'moq.ts';

import {RepositoryEntity} from '../../../../src/core/entities/repository-entity';
import {CloneGit} from '../../../../src/core/interfaces/clone-git';
import {CloneBoilerplateService} from '../../../../src/core/services/clone-boilerplate-service';
import {compressedFileMock} from '../../__mocks__/compressed-file-mock';

describe('Given Clone Boilerplate Service', () => {
  let service: CloneGit;

  beforeEach(() => {
    service = new CloneBoilerplateService(compressedFileMock);
  });

  describe('Given execute method', () => {
    it('Deve baixar o repositorio na pasta informada', async () => {
      const repositoryZip = new Mock<Buffer>().object();
      const axiosResponse = new Mock<AxiosResponse<Buffer>>()
        .setup(mock => mock.data)
        .returns(repositoryZip)
        .object();
      jest.spyOn(axios, 'get').mockResolvedValueOnce(axiosResponse);

      compressedFileMock.unzip.mockResolvedValueOnce(undefined);

      jest.spyOn(fs, 'renameSync').mockImplementation();

      jest.spyOn(cp, 'execSync').mockImplementation();

      const boilerplateRepository = RepositoryEntity.make(
        faker.lorem.words(),
        faker.internet.url(),
        faker.lorem.words()
      );
      const targetFolderName = faker.lorem.words();

      const createdFolder = await service.clone(
        targetFolderName,
        boilerplateRepository
      );

      expect(createdFolder).toBe(targetFolderName);
    });
  });
});

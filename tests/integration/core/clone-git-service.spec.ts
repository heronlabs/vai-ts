import {Test} from '@nestjs/testing';

import {coreModule} from '../../../src/core/core-bootstrap';
import {RepositoryEntity} from '../../../src/core/entities/repository-entity';
import {CloneGit} from '../../../src/core/interfaces/clone-git';
import {DirectoryFolders} from '../directory-folders';

describe('Test first', () => {
  let service: CloneGit;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(coreModule).compile();
    service = moduleRef.get<CloneGit>('CloneBoilerplate');
  });

  it('Should clone boilerplate repository', async () => {
    const repositoryEntity = RepositoryEntity.make(
      'vai-ts-boilerplate',
      'https://github.com/heronlabs/vai-ts-boilerplate/archive/refs/heads/main.zip',
      'main'
    );

    const createdProjectFolderName = await service.clone(
      DirectoryFolders.BOILERPLATE,
      repositoryEntity
    );

    expect(createdProjectFolderName).toBe(DirectoryFolders.BOILERPLATE);
  });
});

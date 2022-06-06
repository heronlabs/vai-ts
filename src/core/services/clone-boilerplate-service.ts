import axios from 'axios';
import {renameSync} from 'fs';
import {Extract} from 'unzipper';

import {RepositoryEntity} from '../entities/repository-entity';
import {ZipReadableEntity} from '../entities/zip-readable-entity';
import {CloneGit} from '../interfaces/clone-git';

export class CloneBoilerplateService implements CloneGit {
  public async clone(
    targetDirectory: string,
    repository: RepositoryEntity
  ): Promise<string> {
    const file = await axios.get<Buffer>(repository.zipUri, {
      responseType: 'arraybuffer',
    });

    const readableInstanceStream = ZipReadableEntity.make(file.data);

    await readableInstanceStream.pipe(Extract({path: '.'})).promise();

    renameSync(
      `./${repository.name}-${repository.branch}`,
      `./${targetDirectory}`
    );

    return targetDirectory;
  }
}

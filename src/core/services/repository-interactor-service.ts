import axios from 'axios';
import {renameSync} from 'fs';
import {Readable} from 'stream';
import {Extract} from 'unzipper';

import {RepositoryEntity} from '../entities/repository-entity';
import {RepositoryInteractor} from '../interfaces/repository-interactor';

export class RepositoryInteractorService implements RepositoryInteractor {
  private async getZipFromRepository(
    repository: RepositoryEntity
  ): Promise<Readable> {
    const file = await axios.get<Buffer>(repository.zipUri, {
      responseType: 'arraybuffer',
    });

    const readableInstanceStream = new Readable();
    readableInstanceStream.push(file.data);
    readableInstanceStream.push(null);

    return readableInstanceStream;
  }

  public async clone(
    targetDirectory: string,
    repository: RepositoryEntity
  ): Promise<boolean> {
    const file = await this.getZipFromRepository(repository);

    await file.pipe(Extract({path: '.'})).promise();

    renameSync(
      `./${repository.name}-${repository.branch}`,
      `./${targetDirectory}`
    );

    return true;
  }
}

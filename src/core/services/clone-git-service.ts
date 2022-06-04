import axios from 'axios';
import {renameSync} from 'fs';
import {Readable} from 'stream';
import {Extract} from 'unzipper';

import {RepositoryEntity} from '../entities/repository-entity';
import {CloneGit} from '../interfaces/clone-git';

export class CloneBoilerplateService implements CloneGit {
  public async clone(
    targetFolderName: string,
    repository: RepositoryEntity
  ): Promise<string> {
    const file = await axios.get<Buffer>(repository.zipUri, {
      responseType: 'arraybuffer',
    });

    await new Promise((resolve, reject) => {
      const readableInstanceStream = new Readable({
        read() {
          this.push(file.data);
          this.push(null);
        },
      });

      readableInstanceStream
        .pipe(Extract({path: '.'}))
        .on('error', reject)
        .on('finish', resolve);
    });

    renameSync(
      `./${repository.name}-${repository.branch}`,
      `./${targetFolderName}`
    );

    return targetFolderName;
  }
}

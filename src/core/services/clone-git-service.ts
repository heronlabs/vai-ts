import {Inject} from '@nestjs/common';
import axios from 'axios';
import {renameSync} from 'fs';

import {CompressedFile} from '../../infrastructure/zip/core/interfaces/compressed-file';
import {RepositoryEntity} from '../entities/repository-entity';
import {CloneGit} from '../interfaces/clone-git';

export class CloneBoilerplateService implements CloneGit {
  constructor(
    @Inject('CompressedFile') private readonly compressedFile: CompressedFile
  ) {}
  public async clone(
    targetFolderName: string,
    repository: RepositoryEntity
  ): Promise<string> {
    const file = await axios.get<Buffer>(repository.zipUri, {
      responseType: 'arraybuffer',
    });

    await this.compressedFile.unzip(file.data);

    renameSync(
      `./${repository.name}-${repository.branch}`,
      `./${targetFolderName}`
    );

    return targetFolderName;
  }
}

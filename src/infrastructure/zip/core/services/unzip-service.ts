import {Extract} from 'unzipper';

import {ZipReadableEntity} from '../entities/zip-readable-entity';
import {CompressedFile} from '../interfaces/compressed-file';

export class UnzipService implements CompressedFile {
  async unzip(compress: Buffer): Promise<void> {
    await new Promise((resolve, reject) => {
      const readableInstanceStream = ZipReadableEntity.make(compress);

      readableInstanceStream
        .pipe(Extract({path: '.'}))
        .on('error', reject)
        .on('finish', resolve);
    });
  }
}

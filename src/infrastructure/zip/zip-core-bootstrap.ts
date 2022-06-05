import {Module, ModuleMetadata} from '@nestjs/common';

import {UnzipService} from './core/services/unzip-service';

export const zipCoreModule: ModuleMetadata = {
  providers: [
    {
      useClass: UnzipService,
      provide: 'CompressedFile',
    },
  ],
  exports: ['CompressedFile'],
};

@Module(zipCoreModule)
export class ZipCoreBootstrap {}

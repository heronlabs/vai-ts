import {Module, ModuleMetadata} from '@nestjs/common';

import {ZipCoreBootstrap} from '../infrastructure/zip/zip-core-bootstrap';
import {CloneBoilerplateService} from './services/clone-boilerplate-service';

export const coreModule: ModuleMetadata = {
  imports: [ZipCoreBootstrap],
  providers: [
    {
      useClass: CloneBoilerplateService,
      provide: 'CloneBoilerplate',
    },
  ],
  exports: ['CloneBoilerplate'],
};

@Module(coreModule)
export class CoreBootstrap {}

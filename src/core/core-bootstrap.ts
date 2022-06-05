import {Module, ModuleMetadata} from '@nestjs/common';

import {ZipCoreBootstrap} from '../infrastructure/zip/zip-core-bootstrap';
import {CloneBoilerplateService} from './services/clone-git-service';

export const coreModule: ModuleMetadata = {
  providers: [
    {
      useClass: CloneBoilerplateService,
      provide: 'CloneBoilerplate',
    },
  ],
  imports: [ZipCoreBootstrap],
};

@Module(coreModule)
export class CoreBootstrap {}

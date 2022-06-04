import {Module, ModuleMetadata} from '@nestjs/common';

import {CloneBoilerplateService} from './services/clone-git-service';

export const coreModule: ModuleMetadata = {
  providers: [
    {
      useClass: CloneBoilerplateService,
      provide: 'CloneBoilerplate',
    },
  ],
};

@Module(coreModule)
export class CoreBootstrap {}

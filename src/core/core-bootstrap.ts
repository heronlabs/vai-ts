import {Module, ModuleMetadata} from '@nestjs/common';

import {CloneBoilerplateService} from './services/clone-boilerplate-service';
import {InstallBoilerplatePackagesService} from './services/install-boilerplate-packages-service';

export const coreModule: ModuleMetadata = {
  providers: [CloneBoilerplateService, InstallBoilerplatePackagesService],
  exports: [CloneBoilerplateService, InstallBoilerplatePackagesService],
};

@Module(coreModule)
export class CoreBootstrap {}

import {Module, ModuleMetadata} from '@nestjs/common';

import {CloneBoilerplateService} from './services/clone-boilerplate-service';
import {InstallBoilerplatePackagesService} from './services/install-boilerplate-packages-service';
import {ReadPackageService} from './services/read-package-service';

export const coreModule: ModuleMetadata = {
  providers: [
    CloneBoilerplateService,
    InstallBoilerplatePackagesService,
    ReadPackageService,
  ],
  exports: [
    CloneBoilerplateService,
    InstallBoilerplatePackagesService,
    ReadPackageService,
  ],
};

@Module(coreModule)
export class CoreBootstrap {}

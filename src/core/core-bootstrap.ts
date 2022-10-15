import {Module, ModuleMetadata} from '@nestjs/common';

import {TerminalBootstrap} from '../application/terminal/terminal-bootstrap';
import {PackageInteractorService} from './services/package-interactor-service';
import {RepositoryInteractorService} from './services/repository-interactor-service';

export const coreModule: ModuleMetadata = {
  imports: [TerminalBootstrap],
  providers: [RepositoryInteractorService, PackageInteractorService],
  exports: [RepositoryInteractorService, PackageInteractorService],
};

@Module(coreModule)
export class CoreBootstrap {}

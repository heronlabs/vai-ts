import {Module, ModuleMetadata} from '@nestjs/common';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {InitBoilerplateCommand} from './commands/init/init-boilerplate-command';
import {VersionCommand} from './commands/version/version-command';

export const cliModule: ModuleMetadata = {
  imports: [CoreBootstrap],
  providers: [InitBoilerplateCommand, VersionCommand],
};

@Module(cliModule)
export class CliBootstrap {}

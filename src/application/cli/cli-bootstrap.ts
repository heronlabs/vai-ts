import {Module, ModuleMetadata} from '@nestjs/common';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {TerminalBootstrap} from '../terminal/terminal-bootstrap';
import {InitApiBoilerplateCommand} from './commands/init/init-api-boilerplate-command';
import {InitApiStoreBoilerplateCommand} from './commands/init/init-api-store-boilerplate-command';
import {InitBasicBoilerplateCommand} from './commands/init/init-basic-boilerplate-command';
import {InitComponentBoilerplateCommand} from './commands/init/init-component-boilerplate-command';
import {InitCronBoilerplateCommand} from './commands/init/init-cron-boilerplate-command';
import {InitIacBoilerplateCommand} from './commands/init/init-iac-boilerplate-command';
import {InitPackageBoilerplateCommand} from './commands/init/init-package-boilerplate-command';
import {InitWCSBoilerplateCommand} from './commands/init/init-wcs-boilerplate-command';
import {VersionCommand} from './commands/version/version-command';
import {ConsolePresenter} from './presenters/console-presenter';

export const cliModule: ModuleMetadata = {
  imports: [CoreBootstrap, TerminalBootstrap],
  providers: [
    ConsolePresenter,
    InitBasicBoilerplateCommand,
    VersionCommand,
    InitApiStoreBoilerplateCommand,
    InitApiBoilerplateCommand,
    InitIacBoilerplateCommand,
    InitPackageBoilerplateCommand,
    InitComponentBoilerplateCommand,
    InitWCSBoilerplateCommand,
    InitCronBoilerplateCommand,
  ],
};

@Module(cliModule)
export class CliBootstrap {}

import {Module, ModuleMetadata} from '@nestjs/common';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {TerminalBootstrap} from '../terminal/terminal-bootstrap';
import {InitApiBoilerplateCommand} from './commands/init/init-api-boilerplate-command';
import {InitBasicBoilerplateCommand} from './commands/init/init-basic-boilerplate-command';
import {InitIacBoilerplateCommand} from './commands/init/init-iac-boilerplate-command';
import {InitPackageBoilerplateCommand} from './commands/init/init-package-boilerplate-command';
import {VersionCommand} from './commands/version/version-command';
import {ConsolePresenter} from './presenters/console-presenter';

export const cliModule: ModuleMetadata = {
  imports: [CoreBootstrap, TerminalBootstrap],
  providers: [
    ConsolePresenter,
    InitBasicBoilerplateCommand,
    VersionCommand,
    InitApiBoilerplateCommand,
    InitIacBoilerplateCommand,
    InitPackageBoilerplateCommand,
  ],
};

@Module(cliModule)
export class CliBootstrap {}

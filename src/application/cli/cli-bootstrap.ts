import {Module, ModuleMetadata} from '@nestjs/common';

import {CoreBootstrap} from '../../core/core-bootstrap';
import {TerminalBootstrap} from '../../infrastructure/terminal/terminal-bootstrap';
import {InitBasicBoilerplateCommand} from './commands/init/init-basic-boilerplate-command';
import {VersionCommand} from './commands/version/version-command';
import {ConsolePresenter} from './presenters/console-presenter';

export const cliModule: ModuleMetadata = {
  imports: [CoreBootstrap, TerminalBootstrap],
  providers: [ConsolePresenter, InitBasicBoilerplateCommand, VersionCommand],
};

@Module(cliModule)
export class CliBootstrap {}

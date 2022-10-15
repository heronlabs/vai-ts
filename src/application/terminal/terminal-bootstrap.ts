import {Module, ModuleMetadata} from '@nestjs/common';

import {TerminalService} from './core/services/terminal-service';

export const terminalModule: ModuleMetadata = {
  providers: [TerminalService],
  exports: [TerminalService],
};

@Module(terminalModule)
export class TerminalBootstrap {}

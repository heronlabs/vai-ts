import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {InitOptions} from './options.enum';
import {Struct} from './struct.service';
import {includes} from 'lodash';

export class Init implements ICommand {
  whoami: Command = Command.init;

  getOptions(): string[] {
    return Object.values(InitOptions);
  }

  private isCompleteInit(options: string[]): boolean {
    const opt1 = InitOptions.full.toString().split(',')[0];
    const opt2 = InitOptions.full.toString().split(',')[1];

    return includes(options, opt1) || includes(options, opt2);
  }

  async run(options: string[]): Promise<void> {
    const projectName = 'project';
    if (this.isCompleteInit(options)) {
      await this.struct.createProjectFolder(projectName);
    }
  }

  constructor(private struct: Struct) {}
}

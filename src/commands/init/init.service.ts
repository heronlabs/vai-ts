import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {InitOptions} from './options.enum';

export class Init implements ICommand {
  whoami: Command = Command.init;

  getOptions(): string[] {
    return Object.values(InitOptions);
  }

  run(options: string[]): void {
    console.log(`${this.whoami} ${options.toString()}`);
  }
}

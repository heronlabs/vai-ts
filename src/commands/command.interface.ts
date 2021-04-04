import {Command} from './command.enum';

export interface ICommand {
  whoami: Command;

  getOptions(): string[];
  run(options: string[]): void;
}

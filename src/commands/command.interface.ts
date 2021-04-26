import {Command} from './command.enum';

/**
 * Interface for the Command implementation.
 */
export interface ICommand {
  /**
   * Identify the command name passed in the terminal.
   */
  whoami: Command;

  /**
   * Return the options avaliable in this command.
   */
  getOptions(): string[];

  /**
   * Execute the command with the following options.
   * @param options options typed in the terminal.
   */
  run(options: string[]): Promise<void>;
}

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
   * Execute the command with the following options.
   */
  run(): Promise<void>;
}

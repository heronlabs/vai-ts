import {map, find, includes} from 'lodash';

import {ICommand} from './commands/command.interface';

/**
 * Class responsible for start the CLI up!
 * Should handler the options in a better way.
 */
export class StartUp {
  /**
   * Check if the typed command is one of the command avaliables.
   * @param command One command avaliable.
   * @param arg0 The command typed in terminal.
   * @returns The command types is the Command avaliable.
   */
  private isCommandValid(command: ICommand, arg0: string): boolean {
    const name = command.whoami;
    return name === arg0;
  }

  /**
   * Execute the command passed in terminal.
   * @param arg0 The command typed in terminal.
   * @param arg1 The string array for options.
   */
  public async run(arg0: string): Promise<void> {
    const command = find(this.commands, (command: ICommand) => {
      return this.isCommandValid(command, arg0);
    });

    if (!command) {
      throw Error('Command not found.');
    }

    await command.run();
  }

  constructor(private commands: ICommand[]) {}
}

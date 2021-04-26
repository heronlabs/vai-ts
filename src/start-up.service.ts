import {map, find, includes} from 'lodash';

import {ICommand} from './commands/command.interface';

/**
 * Class responsible for start the CLI up!
 * Should handler the options in a better way.
 */
export class StartUp {
  /**
   * Check if the typed command is one of the command avaliables.
   * When the options contains a info option, we must remove the value
   * for validate.
   * @param command One command avaliable.
   * @param arg0 The command typed in terminal.
   * @param arg1 The string array for options.
   * @returns The command types is the Command avaliable.
   */
  private isCommandValid(
    command: ICommand,
    arg0: string,
    arg1: string[]
  ): boolean {
    const name = command.whoami;
    const options = command.getOptions().toString();
    const args = map(arg1, option => {
      let optionToBeValidate = option;

      if (option.includes('=')) {
        optionToBeValidate = option.split('=')[0];
      }

      return optionToBeValidate;
    });

    const isOptionsValid = includes(options, args.toString());
    return name === arg0 && isOptionsValid;
  }

  /**
   * Execute the command passed in terminal.
   * @param arg0 The command typed in terminal.
   * @param arg1 The string array for options.
   */
  public async run(arg0: string, arg1: string[]): Promise<void> {
    const command = find(this.commands, (command: ICommand) => {
      return this.isCommandValid(command, arg0, arg1);
    });

    if (!command) {
      throw Error('Command not found.');
    }

    await command.run(arg1);
  }

  constructor(private commands: ICommand[]) {}
}

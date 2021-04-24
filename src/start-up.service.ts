import {map, find, includes} from 'lodash';

import {ICommand} from './commands/command.interface';

export class StartUp {
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

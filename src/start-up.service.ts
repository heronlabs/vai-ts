import {find, includes} from 'lodash';

import {ICommand} from './commands/command.interface';

export class StartUp {
  public async run(arg0: string, arg1: string[]): Promise<void> {
    const command = find(this.commands, (command: ICommand) => {
      const name = command.whoami;
      const options = command.getOptions().toString();
      const commonOptions = includes(options, arg1.toString());
      return name === arg0 && commonOptions;
    });

    if (!command) {
      throw Error('Command not found.');
    }

    await command.run(arg1);
  }

  constructor(private commands: ICommand[]) {}
}

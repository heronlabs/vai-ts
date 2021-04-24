import * as fs from 'fs';

import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
import {VersionOptions} from './options.enum';

export class Version implements ICommand {
  whoami: Command = Command.version;

  getOptions(): string[] {
    return Object.values(VersionOptions);
  }

  async run(): Promise<void> {
    const packageString = fs.readFileSync('../../config.json', 'utf8');
    const packageFile = JSON.parse(packageString);
    console.log(packageFile.version);
  }

  constructor() {}
}

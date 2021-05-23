import * as fs from 'fs';
import path = require('path');

import {Command} from '../command.enum';
import {ICommand} from '../command.interface';
/**
 * Class responsible for inform the current version.
 */
export class Version implements ICommand {
  /**
   * Return the version command name.
   */
  whoami: Command = Command.version;

  /**
   * Read the config file and show the version.
   * We should copy the config file based on package.json
   * after build.
   */
  async run(): Promise<void> {
    const filePath = path.join(__dirname, '../../../../package.json');
    const packageString = fs.readFileSync(filePath, 'utf8');
    const packageFile = JSON.parse(packageString);
    console.log(packageFile.version);
  }
}

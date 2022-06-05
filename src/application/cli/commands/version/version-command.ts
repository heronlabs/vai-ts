import {readFileSync} from 'fs';
import {join} from 'path';

import {Command} from '../../interfaces/command';
import {Commands} from '../commands';

export class VersionCommand implements Command {
  constructor() {}

  getName(): string {
    return Commands.VERSION;
  }

  async run(): Promise<void> {
    const filePath = join(__dirname, '../../../../../package.json');
    const packageString = readFileSync(filePath, 'utf8');
    const packageFile = JSON.parse(packageString);
    console.log(packageFile.version);
  }
}

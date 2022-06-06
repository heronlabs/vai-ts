import {Commands} from '../../enums/commands';
import {Command} from '../../interfaces/command';

export class VersionCommand implements Command {
  getName(): string {
    return Commands.VERSION;
  }

  async run(): Promise<void> {
    console.log('v1');
  }
}

import {Command, CommandRunner} from 'nest-commander';

@Command({name: 'version', description: 'Print current version'})
export class VersionCommand implements CommandRunner {
  async run(): Promise<void> {
    // FIXME: Show package.json version.
    console.log('v1');
  }
}

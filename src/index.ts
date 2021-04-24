import {Babel} from './commands/init/babel.service';
import {GTS} from './commands/init/gts.service';
import {Git} from './commands/init/git.service';
import {Init} from './commands/init/init.service';
import {Jest} from './commands/init/jest.service';
import {StartUp} from './start-up.service';
import {Struct} from './commands/init/struct.service';
import {Travis} from './commands/init/travis.service';
import {Version} from './commands/version/version.service';

(async () => {
  try {
    const babel = new Babel();
    const git = new Git();
    const gts = new GTS();
    const jest = new Jest();
    const struct = new Struct();
    const travis = new Travis();

    const init = new Init(babel, git, gts, jest, struct, travis);

    const version = new Version();

    const commands = [init, version];
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];
    const arg1 = process.argv.slice(3);

    await startUp.run(arg0, arg1);
  } catch (err) {
    console.log(err.message);
  }
})();

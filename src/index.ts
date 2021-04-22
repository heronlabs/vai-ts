import {Init} from './commands/init/init.service';
import {StartUp} from './start-up.service';
import {Struct} from './commands/init/struct.service';

(async () => {
  try {
    const struct = new Struct();
    const init = new Init(struct);
    const commands = new Array(init);
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];
    const arg1 = process.argv.slice(3);

    await startUp.run(arg0, arg1);
  } catch (err) {
    console.log(err.message);
  }
})();

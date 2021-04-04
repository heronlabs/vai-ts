import {Init} from './commands/init/init.service';
import {StartUp} from './start-up.service';

(async () => {
  try {
    const init = new Init();
    const commands = new Array(init);
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];
    const arg1 = process.argv.slice(3);

    await startUp.run(arg0, arg1);
  } catch (err) {
    console.log(err.message);
  }
})();

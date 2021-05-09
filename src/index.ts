#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {Babel} from './third-parties/babel/babel.service';
import {GTS} from './third-parties/gts/gts.service';
import {Init} from './commands/init/init.service';
import {Jest} from './commands/init/third-parties/jest/jest.service';
import {Skeleton} from './commands/init/skeleton/skeleton.service';
import {StartUp} from './start-up.service';
import {Travis} from './commands/init/third-parties/travis/travis.service';
import {Version} from './commands/version/version.service';

(async () => {
  try {
    const babel = new Babel();

    const gts = new GTS();
    const jest = new Jest();
    const skeleton = new Skeleton();
    const travis = new Travis();

    const init = new Init(babel, gts, jest, travis, skeleton);

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

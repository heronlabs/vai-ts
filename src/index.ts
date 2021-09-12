#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {GTS} from './options/third-parties/gts/gts.service';
import {Init} from './commands/init/init.service';
import {Jest} from './options/third-parties/jest/jest.service';
import {PrintFactory} from './services/print/print.factory';
import {Skeleton} from './options/skeleton/skeleton.service';
import {StartUp} from './start-up.service';
import {Travis} from './options/dev-ops/travis/travis.service';
import {Version} from './commands/version/version.service';

(async () => {
  try {
    const gts = new GTS();
    const jest = new Jest();
    const skeleton = new Skeleton();
    const travis = new Travis();

    const print = PrintFactory.makePrint();

    const init = new Init(gts, jest, travis, skeleton, print);

    const version = new Version();

    const commands = [init, version];
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];

    await startUp.run(arg0);
  } catch (err) {
    console.log(err);
  }
})();

#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {GTS} from './third-parties/gts/gts.service';
import {Init} from './commands/init/init.service';
import {Jest} from './third-parties/jest/jest.service';
import {Skeleton} from './skeleton/skeleton.service';
import {StartUp} from './start-up.service';
import {Travis} from './dev-ops/travis/travis.service';
import {Version} from './commands/version/version.service';

(async () => {
  try {
    const gts = new GTS();
    const jest = new Jest();
    const skeleton = new Skeleton();
    const travis = new Travis();
    const init = new Init(gts, jest, travis, skeleton);

    const version = new Version();

    const commands = [init, version];
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];

    await startUp.run(arg0);
  } catch (err) {
    console.log(err);
  }
})();

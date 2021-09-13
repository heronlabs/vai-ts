#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {ChalkService} from './services/print/chalk/print.service';
import {GTS} from './options/third-parties/gts/gts.service';
import {Init} from './commands/init/init.service';
import {InquirerService} from './services/prompt/inquirer/prompt.service';
import {Jest} from './options/third-parties/jest/jest.service';
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

    const print = new ChalkService();
    const prompt = new InquirerService();

    const init = new Init(gts, jest, travis, skeleton, print, prompt);

    const version = new Version();

    const commands = [init, version];
    const startUp = new StartUp(commands);
    const arg0 = process.argv[2];

    await startUp.run(arg0);
  } catch (err) {
    console.log(err);
  }
})();

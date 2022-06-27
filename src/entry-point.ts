#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {CommandFactory} from 'nest-commander';

import {CliBootstrap} from './application/cli/cli-bootstrap';

async function bootstrap() {
  await CommandFactory.run(CliBootstrap, {
    logger: false,
  });
}

bootstrap();

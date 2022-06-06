#!/usr/bin/env node
'use strict';

import 'reflect-metadata';

import {NestFactory} from '@nestjs/core';

import {CliBootstrap} from '../cli/cli-bootstrap';
import {InitBoilerplateCommand} from '../cli/commands/init/init-boilerplate-command';
import {VersionCommand} from '../cli/commands/version/version-command';
import {Command} from '../cli/interfaces/command';
import {Options} from '../cli/interfaces/options';
import {runCommand} from './command';
import {runCommandWithOptions} from './command-with-options';

(async () => {
  const givenCommand = process.argv[2];

  const app = await NestFactory.createApplicationContext(CliBootstrap, {
    logger: false,
  });

  const commands: Command[] = [app.get(VersionCommand)];
  const commandsWithOptions: (Command & Options<unknown>)[] = [
    app.get(InitBoilerplateCommand),
  ];

  const command: Command | undefined = commands.find(
    command => command.getName() === givenCommand
  );

  if (command) {
    await runCommand(command);
  } else {
    const commandWithOptions: (Command & Options<unknown>) | undefined =
      commandsWithOptions.find(command => command.getName() === givenCommand);

    if (commandWithOptions) {
      await runCommandWithOptions(commandWithOptions);
    } else {
      console.log(`[ Not found ] | Command ${givenCommand} not found`);
    }
  }

  await app.close();
})();

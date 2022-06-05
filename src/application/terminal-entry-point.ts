import {NestFactory} from '@nestjs/core';

import {CliBootstrap} from './cli/cli-bootstrap';
import {Commands} from './cli/commands/commands';
import {InitBoilerplateCommand} from './cli/commands/init/init-boilerplate-command';
import {Command} from './cli/interfaces/command';

export const cli = async (givenCommand: Commands): Promise<boolean> => {
  const app = await NestFactory.createApplicationContext(CliBootstrap, {
    logger: false,
  });

  const commands: Command[] = [app.get(InitBoilerplateCommand)];

  const command = commands.find(job => job.getName() === givenCommand);

  let result: boolean;

  if (command) {
    console.log(`[ Running ] | ${command.getName()}`);
    try {
      const status = await command.run();

      console.log(`[ Final status ] | ${status}`);
      result = true;
    } catch (error: unknown) {
      console.log(`[ Error ] | ${error} on job: ${givenCommand}`);
      result = false;
    }
  } else {
    console.log(`[ Not found ] | Command ${givenCommand} not found`);
    result = false;
  }

  await app.close();

  return result;
};

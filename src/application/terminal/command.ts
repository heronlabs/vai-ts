import {Command} from '../cli/interfaces/command';

export const runCommand = async (command: Command): Promise<void> => {
  console.log(`[ Running ] | ${command.getName()}`);

  try {
    await command.run();
  } catch (error: unknown) {
    console.log(`[ Error ] | ${error} on job: ${command.getName()}`);
  }
};

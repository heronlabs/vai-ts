import {Command} from '../cli/interfaces/command';
import {Options} from '../cli/interfaces/options';
import inquirer = require('inquirer');

export const runCommandWithOptions = async <A>(
  command: Command & Options<A>
): Promise<void> => {
  console.log(`[ Running ] | ${command.getName()}`);

  try {
    const questions = command.getQuestions();

    const answers = await inquirer.prompt<A>(questions);
    await command.run(answers);
  } catch (error: unknown) {
    console.log(`[ Error ] | ${error} on job: ${command.getName()}`);
  }
};

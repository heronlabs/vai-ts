import {Mock} from 'moq.ts';
import {Command} from './commands/command.enum';
import {ICommand} from './commands/command.interface';
import {StartUp} from './start-up.service';

describe('Start up', () => {
  it('Should run a found command', async () => {
    const arg0 = Command.init;
    const runMock = jest.fn();

    const mockCommand = new Mock<ICommand>();
    const command = mockCommand
      .setup(instance => instance.whoami)
      .returns(Command.init)
      .setup(instance => instance.run)
      .returns(() => runMock())
      .object();

    const startUp = new StartUp([command]);
    await startUp.run(arg0);

    expect(runMock).toHaveBeenCalled();
  });

  it('Should not found any command', async () => {
    const arg0 = 'Command';
    const runMock = jest.fn();

    const mockCommand = new Mock<ICommand>();
    const command = mockCommand
      .setup(instance => instance.whoami)
      .returns(Command.init)
      .setup(instance => instance.run)
      .returns(() => runMock())
      .object();

    const startUp = new StartUp([command]);

    await expect(async () => startUp.run(arg0)).rejects.toThrow(
      'Command not found.'
    );
  });
});

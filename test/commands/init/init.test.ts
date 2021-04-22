import {Command} from '../../../src/commands/command.enum';
import {Init} from '../../../src/commands/init/init.service';
import {Mock} from 'moq.ts';
import {Struct} from '../../../src/commands/init/struct.service';

describe('Init', () => {
  const structMock = new Mock<Struct>();
  const struct = structMock.object();
  const init = new Init(struct);

  describe('Run', () => {
    it('Should perform a full initialization', async () => {
      const options = ['-y'];
      const projectName = 'project';
      const createProjectFolderMock = jest.fn();
      structMock
        .setup(i => i.createProjectFolder)
        .returns(createProjectFolderMock);

      await init.run(options);

      expect(createProjectFolderMock).toHaveBeenCalledWith(projectName);
    });
  });

  describe('Whoami', () => {
    it('Should return whoami', () => {
      const whoami = init.whoami;

      expect(whoami).toBe(Command.init);
    });
  });

  describe('Get Options', () => {
    it('Should return options', () => {
      const currentOptions = ['', '-y,--yes'];

      const options = init.getOptions().toString();

      expect(options).toBe(currentOptions.toString());
    });
  });
});

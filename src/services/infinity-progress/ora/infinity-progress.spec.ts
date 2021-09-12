import {Mock} from 'moq.ts';
import {Ora} from 'ora';
import {OraService} from './infinity-progress.service';

describe('Given infinity progress', () => {
  const oraMock = new Mock<Ora>();

  const start = jest.fn().mockReturnValue(oraMock.object());
  oraMock.setup(i => i.start).returns(start);

  const stopAndPersist = jest.fn().mockImplementation();
  oraMock.setup(i => i.stopAndPersist).returns(stopAndPersist);

  const initialMessage = 'This is the first message';

  it('Should initialize the progress', () => {
    new OraService(oraMock.object(), initialMessage);

    expect(start).toHaveBeenNthCalledWith(1, initialMessage);
  });

  it('Should stop and show a message', () => {
    const messageModel = {
      symbol: '📘',
      text: 'All tests done',
    };

    const infinityProgress = new OraService(oraMock.object(), initialMessage);

    infinityProgress.stop(messageModel);

    expect(stopAndPersist).toHaveBeenNthCalledWith(1, messageModel);
  });
});

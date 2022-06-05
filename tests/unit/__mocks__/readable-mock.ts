import {Mock} from 'moq.ts';
import {Readable} from 'stream';

export const readableMoq = new Mock<Readable>();

export const readableMock = {
  pipe: jest.fn().mockReturnValue(readableMoq.object()),
  on: jest.fn().mockReturnValue(readableMoq.object()),
};

readableMoq
  .setup(mock => mock.pipe)
  .returns(readableMock.pipe)
  .setup(mock => mock.on)
  .returns(readableMock.on);

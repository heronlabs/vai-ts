import {Mock} from 'moq.ts';
import {Readable} from 'stream';
import {ParseStream} from 'unzipper';

export const readableMoq = new Mock<Readable>();

const parseStreamMoq = new Mock<ParseStream>();

export const parseStreamMock = {
  promise: jest.fn(),
};

export const readableMock = {
  pipe: jest.fn().mockReturnValue(parseStreamMoq.object()),
};

readableMoq.setup(mock => mock.pipe).returns(readableMock.pipe);
parseStreamMoq.setup(mock => mock.promise).returns(parseStreamMock.promise);

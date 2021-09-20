import {InfinityProgressFactory} from './infinity-progress.factory';

jest.mock('ora', () => {
  const ora = () => ({
    start: () => {},
  });

  return ora;
});

describe('Given a factory for infinity progress', () => {
  it('Should initialize a infinity progress for Ora service', () => {
    const initialMessage = 'This is it';
    const className = InfinityProgressFactory.makeInfinityProgress(
      initialMessage
    ).constructor.name;

    expect(className).toBe('OraService');
  });
});

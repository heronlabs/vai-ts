import {PrintFactory} from './print.factory';

describe('Given a factory for print', () => {
  it('Should initialize a print for Chalk service', () => {
    const className = PrintFactory.makePrint().constructor.name;

    expect(className).toBe('ChalkService');
  });
});

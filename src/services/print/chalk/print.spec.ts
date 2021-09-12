import chalk = require('chalk');

import {BackgroundColor, Color, PrintOptions} from '../print-options.model';

import {ChalkService} from './print.service';

describe('Given a print service', () => {
  const printService = new ChalkService();

  it('Should print a simple text', () => {
    const text = 'This is a string';
    const options: PrintOptions = {
      color: Color.WHITE,
      backgroundColor: BackgroundColor.BG_CYAN,
    };

    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    printService.log(text, options);

    expect(consoleLogSpy).toHaveBeenNthCalledWith(
      1,
      chalk[options.color][options.backgroundColor].bold(text)
    );
  });
});

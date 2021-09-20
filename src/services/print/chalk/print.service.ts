import {IPrint} from '../print.interface';
import {PrintOptions} from '../print-options.model';
import chalk = require('chalk');

/**
 * Service for implement Print interface.
 */
export class ChalkService implements IPrint {
  /**
   * log the text in the prompt.
   * @param text text to be printed.
   * @param options custom for printed text.
   */
  log(text: string, options: PrintOptions): void {
    console.log(chalk[options.color][options.backgroundColor].bold(text));
  }
}

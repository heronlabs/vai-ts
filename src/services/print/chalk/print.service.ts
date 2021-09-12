import {IPrint} from '../print.interface';
import {PrintOptions} from '../print-options.model';
import chalk = require('chalk');

export class ChalkService implements IPrint {
  log(text: string, options: PrintOptions): void {
    console.log(chalk[options.color][options.backgroundColor].bold(text));
  }
}

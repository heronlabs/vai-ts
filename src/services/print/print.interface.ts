import {PrintOptions} from './print-options.model';

export interface IPrint {
  log(text: string, options: PrintOptions): void;
}

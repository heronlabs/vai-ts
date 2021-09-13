import {PrintOptions} from './print-options.model';

/**
 * Interface for print custom text in prompt.
 */
export interface IPrint {
  log(text: string, options: PrintOptions): void;
}

import {IInfinityProgress} from './infinity-progress.interface';
import {OraService} from './ora/infinity-progress.service';
import oraLib = require('ora');

/**
 * Factory for make infinity progress interface.
 */
export class InfinityProgressFactory {
  /**
   * Make an infinity progress with Ora Service.
   * @param initialMessage text to be printed with the infinity progress.
   * @returns Interface for inifinity progress.
   */
  static makeInfinityProgress(initialMessage: string): IInfinityProgress {
    const ora = oraLib();
    const oraService = new OraService(ora, initialMessage);
    return oraService;
  }
}

import {IInfinityProgress} from './infinity-progress.interface';
import {OraService} from './ora/infinity-progress.service';
import oraLib = require('ora');

export class InfinityProgressFactory {
  static makeInfinityProgress(initialMessage: string): IInfinityProgress {
    const ora = oraLib();
    const oraService = new OraService(ora, initialMessage);
    return oraService;
  }
}

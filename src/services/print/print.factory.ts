import {ChalkService} from './chalk/print.service';
import {IPrint} from './print.interface';

export class PrintFactory {
  static makePrint(): IPrint {
    const chalkService = new ChalkService();
    return chalkService;
  }
}

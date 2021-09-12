import {IInfinityProgress} from '../infinity-progress.interface';
import {MessageModel} from '../message-options.model';
import {Ora} from 'ora';

export class OraService implements IInfinityProgress {
  private progress: Ora;

  public stop(messageModel: MessageModel): void {
    this.progress.stopAndPersist({
      symbol: messageModel.symbol,
      text: messageModel.text,
    });
  }

  constructor(ora: Ora, initialMessage: string) {
    const progress = ora.start(initialMessage);
    this.progress = progress;
  }
}

import {IInfinityProgress} from '../infinity-progress.interface';
import {MessageModel} from '../message-options.model';
import {Ora} from 'ora';

/**
 * Service for implement infinity interface.
 */
export class OraService implements IInfinityProgress {
  private progress: Ora;

  /**
   * Stop the infinity progress.
   * @param messageModel custom message to be printed after stop.
   */
  public stop(messageModel: MessageModel): void {
    this.progress.stopAndPersist({
      symbol: messageModel.symbol,
      text: messageModel.text,
    });
  }

  /**
   * Initialize the infinity progress.
   * @param ora Ora provider.
   * @param initialMessage text to be printed on start.
   */
  constructor(ora: Ora, initialMessage: string) {
    const progress = ora.start(initialMessage);
    this.progress = progress;
  }
}

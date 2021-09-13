import {MessageModel} from './message-options.model';

/**
 * Interface for infinity progress.
 */
export interface IInfinityProgress {
  /**
   * Stop the infinity progress.
   * @param messageModel model for customize message at the end.
   */
  stop(messageModel: MessageModel): void;
}

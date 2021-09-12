import {MessageModel} from './message-options.model';

export interface IInfinityProgress {
  stop(messageModel: MessageModel): void;
}

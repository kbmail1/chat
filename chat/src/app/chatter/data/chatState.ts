import { IMessage } from './message';
export interface IChatState {
  socket: any | undefined,
  messages: IMessage[],
  uuid: string,
}

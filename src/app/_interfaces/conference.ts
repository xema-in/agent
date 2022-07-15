import { Channel } from './channel';

export interface Conference {
  id: string;
  members: Array<Channel>;
}

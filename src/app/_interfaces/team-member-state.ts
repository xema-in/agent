export interface TeamMemberState {

  agentId: string;
  name: string;
  firstLoginTime: string;

  device: string;
  deviceStatus: string;
  deviceStatusCss: string;
  currentCallTimestamp: Date;

  agentStatus: string;

  queueName: string;
  caller: string;
  queueCallTimestamp: Date;
  callUniqueId: string;

  wrapUpTimestamp: Date;

  waitingForBreak: boolean;
  breakTimestamp: Date;

}

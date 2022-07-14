export interface CallInfo {
  queue: string;
  callNumber: string;
  cli: string;
  startTime: string;
  endTime: string;
}

export interface CallLog {
  call: number;
  callDuration: number;
  callWrapupDuration: number;
}

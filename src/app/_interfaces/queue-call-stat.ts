export interface CallStat {
  queue: string;
  holdTime: number;
}

export interface QueueCallStat {
  device: string;
  cli: string;
  id: string;
  queue: string;
  stats: CallStat;
}

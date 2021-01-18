export class CallStat {
    queue: string;
    holdTime: number;
}

export class QueueCallStat {
    device: string;
    cli: string;
    id: string;
    queue: string;
    stats: CallStat;
}

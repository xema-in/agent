export class ScreenPopup {
    name: string;
    url: string;
}

export class QueueCallParameters {
    queue: string;
    screenPopups: any;
}

export class QueueCall {
    device: string;
    cli: string;
    id: string;
    channel: string;
    queue: any;
    parameters: QueueCallParameters;
    dispositions: any;
    callback: any;
    endCall: any;
    trunk: any;
}

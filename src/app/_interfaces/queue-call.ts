export interface ScreenPopup {
  name: string;
  url: string;
}

export interface QueueCallParameters {
  queue: string;
  screenPopups: any;
}

export interface QueueCall {
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

export interface Callback {
  Disposition: number;
  Cli: string;
  Channel: string;
  Id: string;
}

export interface Calldispositions {
  CallId: string;
}

export interface EndCall {
  Channel: string;
}

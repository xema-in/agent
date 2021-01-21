import { Injectable } from '@angular/core';
import { CallInfo, CallLog } from '../_interfaces/call-info';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  callinfolist: Array<CallInfo> = [];
  calllog: CallLog;
}


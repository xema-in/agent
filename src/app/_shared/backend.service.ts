import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ServerConnection } from 'jema';
import { BehaviorSubject, interval, Subject } from 'rxjs';
import { ConnectionState } from 'jema/lib/_interfaces/connection-state';
import { CallInfo, CallLog } from '../_interfaces/call-info';
import { GuiType } from 'jema/lib/_interfaces/gui-type';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private token!: string;
  private serverConnection!: ServerConnection;
  private secondsTimer$ = interval(1000);

  public appState = new BehaviorSubject<ConnectionState>({ state: 'Unknown', connected: false });
  public teamLeadFeatures = new BehaviorSubject<boolean>(false);
  public secondsClock = new Subject<number>();

  callinfolist: Array<CallInfo> = [];
  calllog!: CallLog;

  constructor() {
    this.secondsTimer$.subscribe((tick) => {
      this.secondsClock.next(tick);
    });
  }

  setAppState(state: ConnectionState): void {
    this.appState.next(state);
  }

  enableTeamLeadFeatures(flag: boolean): void {
    this.teamLeadFeatures.next(flag);
  }

  getToken(): string {
    return this.token;
  }

  saveToken(token: string): void {
    this.token = token;
  }

  getBackendUrl(): string {

    if (!environment.production) {
      const url = environment.dev.server;
      if (url !== null && url !== undefined && url !== '') {
        return url;
      }
    }

    if (true) {
      const url = environment.backend;
      if (url !== null && url !== undefined && url !== '') {
        return url;
      }
    }

    if (true) {
      const url = localStorage.getItem('backend');
      if (url !== null && url !== undefined && url !== '') {
        return url;
      }
    }

    return '';
  }

  saveBackendIpAddress(ip: string): void {
    localStorage.setItem('backend', ip);
  }

  getServerConnection(): ServerConnection {
    return this.serverConnection;
  }

  setupServerConnection(): void {
    this.serverConnection = new ServerConnection(this.getBackendUrl(), this.getToken(), GuiType.Agent);
  }

  connect(): void {
    this.serverConnection.connect();
  }

  disconnect(): void {
    this.serverConnection.disconnect();
  }

}

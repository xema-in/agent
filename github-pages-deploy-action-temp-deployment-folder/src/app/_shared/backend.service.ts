import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ServerConnection } from 'jema';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private serverConnection: ServerConnection;
  public appState = new BehaviorSubject<any>({ state: 'Unknown' });
  public teamLeadFeatures = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  setAppState(state: any): void {
    this.appState.next(state);
  }

  enableTeamLeadFeatures(flag: boolean) {
    this.teamLeadFeatures.next(flag);
  }

  // pingServer(ip) {
  //   return this.remote.get(ip + '/api/Setup/Ping');
  // }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  getBackendUrl(): string {
    if (environment.backend !== '') {
      return environment.backend;
    } else {
      return localStorage.getItem('backend');
    }
  }

  saveBackendIpAddress(ip: string) {
    localStorage.setItem('backend', ip);
  }

  getServerConnection(): ServerConnection {
    return this.serverConnection;
  }

  setupServerConnection() {
    this.serverConnection = new ServerConnection(this.getBackendUrl(), this.getToken());
  }

  connect() {
    this.serverConnection.connect();
  }

  // login(param: LoginParameters) {
  //   this.log('Api', 'LoginAgent2');
  //   return this.remote.post(ManagerEnvironment.getBackendUrl() + '/api/Account/LoginAgent2', param);
  // }

  // logout() {
  //   // localStorage.removeItem('access_token');
  //   this.log('Api', 'LogoutAgent');
  //   // return this.remote.post(ManagerEnvironment.getBackendUrl() + '/api/Account/LogoutAgent', {});
  // }

  // IsAgentAuthenticated() {
  //   this.log('Api', 'IsAgentAuthenticated2');
  //   return this.remote.get(ManagerEnvironment.getBackendUrl() + '/api/Account/IsAgentAuthenticated2', {});
  // }

  // IsPhoneMapped() {
  //   this.log('Api', 'IsPhoneMapped');
  //   return this.remote.get(ManagerEnvironment.getBackendUrl() + '/api/Account/IsPhoneMapped', {});
  // }

  // mapPhone(param: DeviceMapParameters) {
  //   this.log('Api', 'AgentLogin');
  //   return this.remote.post(ManagerEnvironment.getBackendUrl() + '/api/Devices/AgentLogin', param);
  // }

  // unassignPhone() {
  //   this.log('Api', 'UnassignPhone');
  //   return this.remote.post(ManagerEnvironment.getBackendUrl() + '/api/Devices/UnassignPhone', {});
  // }

  // endcall(param: EndCall) {
  //   this.log('Api', 'HangupCall');
  //   return this.remote.post(ManagerEnvironment.getBackendUrl() + '/api/Call/HangupCall', param);
  // }

  // calldispositions(param: Calldispositions) {
  //   this.log('Api', 'CallDispositions');
  //   return this.remote.post(ManagerEnvironment.getBackendUrl() + '/api/Call/CallDispositions', param);
  // }

  // getAgents() {
  //   this.log('Api', 'GetTeamMembers');
  //   return this.remote.get(ManagerEnvironment.getBackendUrl() + '/api/Agents/GetTeamMembers');
  // }

}

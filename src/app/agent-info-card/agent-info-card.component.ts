import { Component, OnInit } from '@angular/core';
import { BreakState } from 'jema/lib/_interfaces/break-state';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-agent-info-card',
  templateUrl: './agent-info-card.component.html',
  styleUrls: ['./agent-info-card.component.scss']
})
export class AgentInfoCardComponent implements OnInit {
  bus: any;
  info: any;
  breakState: BreakState;
  values = [];

  constructor(service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.bus.info.subscribe((info) => {
      this.info = info;

      this.values = [
        // { name: 'Name', value: info?.agentInfo.agentName },
        { name: 'User Id', value: info?.agentInfo.userId },
        { name: 'First Login', value: new Date(info?.agentInfo.firstLogin).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) },
      ];

    });

    this.bus.breakState.subscribe((breakState) => {
      console.log(breakState);
      this.breakState = breakState;
    });

  }
}

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BreakState } from 'jema/lib/_interfaces/break-state';
import { BackendService } from '../_shared/backend.service';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-agent-info-card',
  templateUrl: './agent-info-card.component.html',
  styleUrls: ['./agent-info-card.component.scss']
})
export class AgentInfoCardComponent implements OnInit {
  breakStateSubscription: any;
  agentInfoSubscription: any;

  bus: any;
  info: any;
  breakState: BreakState;
  values = [];

  constructor(service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.agentInfoSubscription = this.bus.info.subscribe((info) => {
      this.info = info;

      this.values = [
        // { name: 'Name', value: info?.agentInfo.agentName },
        { name: 'User Id', value: info?.agentInfo.userId },
        { name: 'First Login', value: new Date(info?.agentInfo.firstLogin).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) },
      ];

    });

    this.breakStateSubscription = this.bus.breakState.subscribe((breakState) => {
      console.log(breakState);
      this.breakState = breakState;
    });

  }
}

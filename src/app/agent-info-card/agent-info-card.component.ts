import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-agent-info-card',
  templateUrl: './agent-info-card.component.html',
  styleUrls: ['./agent-info-card.component.css']
})
export class AgentInfoCardComponent implements OnInit {
  bus: any;
  info: any;

  constructor(service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.bus.info.subscribe((agentInfo) => {
      this.info = agentInfo;
    });

  }
}

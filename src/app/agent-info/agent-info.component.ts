import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';

@Component({
  selector: 'app-agent-info',
  templateUrl: './agent-info.component.html',
  styleUrls: ['./agent-info.component.css']
})
export class AgentInfoComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-team-monitor',
  templateUrl: './team-monitor.component.html',
  styleUrls: ['./team-monitor.component.scss']
})
export class TeamMonitorComponent implements OnInit {

  teamLead = false;
  bus: ServerConnection;

  constructor(private service: BackendService,) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.service.teamLeadFeatures.subscribe((status) => {
      this.teamLead = status;
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';
import { SharedDataService } from '../_shared/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  teamLead = false;
  serverConnection: ServerConnection;

  constructor(private service: BackendService, public recentCall: SharedDataService) {
    this.serverConnection = service.getServerConnection();
  }

  ngOnInit() {
    this.service.teamLeadFeatures.subscribe((status) => {
      this.teamLead = status;
    });

  }

}

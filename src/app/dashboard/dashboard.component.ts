import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  teamLead = false;
  crmDashboard = false;
  bus: ServerConnection;
  task: any;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.service.teamLeadFeatures.subscribe((status) => {
      this.teamLead = status;
    });

    this.bus.task.subscribe((task) => {
      this.task = task;
    });

    this.bus.info.subscribe((data: any) => {
      this.crmDashboard = data.features.crmDashboard;
    });

  }

}

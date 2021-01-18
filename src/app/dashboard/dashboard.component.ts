import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_shared/backend.service';
import { SharedDataService } from '../_shared/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  teamLead = false;

  constructor(private service: BackendService, public recentCall: SharedDataService) {
  }

  ngOnInit() {
    this.service.teamLeadFeatures.subscribe((status) => {
      this.teamLead = status;
    });

  }

}

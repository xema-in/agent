import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-left-sidebar-navigator',
  templateUrl: './left-sidebar-navigator.component.html',
  styleUrls: ['./left-sidebar-navigator.component.scss']
})
export class LeftSidebarNavigatorComponent implements OnInit {

  teamLead = false;
  callHistory = false;
  missedCalls = false;

  bus: ServerConnection;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {
    this.service.teamLeadFeatures.subscribe((status) => {
      this.teamLead = status;
    });

    this.bus.info.subscribe((data: any) => {
      this.callHistory = data.features.callHistory;
      this.missedCalls = data.features.missedCalls;
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-left-sidebar-navigator',
  templateUrl: './left-sidebar-navigator.component.html',
  styleUrls: ['./left-sidebar-navigator.component.scss']
})
export class LeftSidebarNavigatorComponent implements OnInit {

  teamLead = false;

  constructor(private service: BackendService,) { }

  ngOnInit() {
    this.service.teamLeadFeatures.subscribe((status) => {
      this.teamLead = status;
    });
  }
}

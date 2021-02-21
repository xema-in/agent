import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/_shared/shared-data.service';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-recent-calls',
  templateUrl: './recent-calls.component.html',
  styleUrls: ['./recent-calls.component.scss']
})
export class RecentCallsComponent implements OnInit {
  bus: ServerConnection;


  constructor(private service: BackendService, private router: Router, public recentCall: SharedDataService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {


  }

}

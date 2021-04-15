import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-queue-monitor',
  templateUrl: './queue-monitor.component.html',
  styleUrls: ['./queue-monitor.component.scss']
})
export class QueueMonitorComponent implements OnInit {
  bus: ServerConnection;
  constructor(private service: BackendService,) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {
  }

}

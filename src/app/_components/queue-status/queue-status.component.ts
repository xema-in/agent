import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../_shared/backend.service';
import { SharedDataService } from '../../_shared/shared-data.service';
import { QueueUpdate } from '../../_interfaces/queue-update';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-queue-status',
  templateUrl: './queue-status.component.html',
  styleUrls: ['./queue-status.component.css']
})
export class QueueStatusComponent implements OnInit {

  bus: ServerConnection;
  queueUpdates: Array<QueueUpdate> = [];

  constructor(private service: BackendService, public recentCall: SharedDataService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {

    this.bus.queueUpdates.subscribe((queueUpdates) => {
      this.queueUpdates = queueUpdates;
    });

  }

}

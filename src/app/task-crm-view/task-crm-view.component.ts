import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-task-crm-view',
  templateUrl: './task-crm-view.component.html',
  styleUrls: ['./task-crm-view.component.scss']
})
export class TaskCrmViewComponent implements OnInit {
  bus: ServerConnection;
  queueCall: any;
  url: string;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.bus.task.subscribe((queueCall) => {
      this.queueCall = queueCall;
      if (
        this.queueCall &&
        this.queueCall.queue &&
        this.queueCall.queue.crms &&
        this.queueCall.queue.crms.length > 0
      ) {

        this.queueCall.queue.crms.forEach((item, index) => {
          this.url = item.url;
        });

      }
    });

  }

}

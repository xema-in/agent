import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html'

})
export class TaskStatusComponent implements OnInit {

  bus: ServerConnection;
  task: any;
  hasTask = false;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {

    this.bus.task.subscribe((task) => {
      this.task = task;
      if (this.task === null || this.task === undefined) {
        this.hasTask = false;
      } else {
        this.hasTask = true;
      }
    });

  }

}

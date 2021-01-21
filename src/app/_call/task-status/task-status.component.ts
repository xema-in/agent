import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { Router } from '@angular/router';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html'

})
export class TaskStatusComponent implements OnInit {

  bus: ServerConnection;
  task: any;
  taskAssigned: boolean;

  constructor(private service: BackendService, private router: Router) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {

    this.bus.task.subscribe((task) => {
      if (task === null || task === undefined) {
        this.taskAssigned = false;
      } else {
        this.taskAssigned = true;
      }
      this.task = task;
    });

  }

}

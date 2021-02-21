import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@UntilDestroy()
@Component({
  selector: 'app-task-info-card',
  templateUrl: './task-info-card.component.html',
  styleUrls: ['./task-info-card.component.scss']
})
export class TaskInfoCardComponent implements OnInit {
  bus: ServerConnection;
  task: any;
  values = [];

  color: string;
  completed: any;
  ahtTarget: number;
  currentprogress: any;
  interval;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.bus.task.subscribe((task) => {
      this.task = task;

      this.values = [
        { name: 'Queue Name', value: task?.call.queue },
        { name: 'Unique Id', value: task?.call.attributes.linkedid },
        { name: 'Cli', value: task?.call.attributes.destconnectedlinenum, enableCopy: true },
        { name: 'Start Time', value: new Date(task?.call.dateReceived).toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }) },
        { name: 'AHT Target', value: this.formatTime(task?.queue.baseQueueOptions.ahtTarget) },
      ];

      this.ahtTarget = this.task.queue.baseQueueOptions.ahtTarget;
      this.currentprogress = 0;

      if (this.task.queue.baseQueueOptions.ahtTarget) {
        this.service.secondsClock.subscribe((data) => {
          this.currentprogress += 1;
          this.completed = (this.currentprogress / this.ahtTarget) * 100;
          this.color = 'green-progress-bar';
          if (this.currentprogress > this.ahtTarget) {
            this.color = 'red-progress-bar';
          }
        });
      }

      if (this.task && this.task.call.attributes.destconnectedlinenum) {
        if (this.task.call.attributes.destconnectedlinenum.startsWith('+91')) {
          this.task.call.attributes.destconnectedlinenum = this.task.call.attributes.destconnectedlinenum.substring(
            3
          );
        }
      }

    });

  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? ' h ' : ' h ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' min ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
    return hDisplay + mDisplay + sDisplay;
  }

}

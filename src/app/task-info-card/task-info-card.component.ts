import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-task-info-card',
  templateUrl: './task-info-card.component.html',
  styleUrls: ['./task-info-card.component.css']
})
export class TaskInfoCardComponent implements OnInit {
  bus: ServerConnection;
  task: any;
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

      if (this.task && this.task.call.attributes.destconnectedlinenum) {
        if (this.task.call.attributes.destconnectedlinenum.startsWith('+91')) {
          this.task.call.attributes.destconnectedlinenum = this.task.call.attributes.destconnectedlinenum.substring(
            3
          );
        }
        clearInterval(this.interval);
        if (this.task.queue.baseQueueOptions.ahtTarget) {
          this.ahtTarget = this.task.queue.baseQueueOptions.ahtTarget;
          this.currentprogress = 0;
          this.startTimer();
        }
      }

    });

  }

  GetDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? ' h ' : ' h ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' min ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.currentprogress += 1;
      this.completed = (this.currentprogress / this.ahtTarget) * 100;
      this.color = 'green';
      if (this.currentprogress > this.ahtTarget) {
        this.color = 'red';
        // clearInterval(this.interval);
      }
    }, 1000);
  }

}

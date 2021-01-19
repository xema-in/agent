import { Component, OnInit } from '@angular/core';
import { QueueUpdate } from 'src/app/_interfaces/queue-update';
import { BackendService } from 'src/app/_shared/backend.service';
import { SharedDataService } from 'src/app/_shared/shared-data.service';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-agent-status',
  templateUrl: './agent-status.component.html',
  styleUrls: ['./agent-status.component.css']
})
export class AgentStatusComponent implements OnInit {

  bus: ServerConnection;
  info: any;
  time: any;
  duration: any;
  cdate = new Date();
  task: any;
  taskAssigned: boolean;
  callduration: any;
  wrapupduration: any;
  interval;
  wrapinterval;
  phoneState: any;
  hangupcalled = true;
  queueUpdates: Array<QueueUpdate> = [];

  constructor(private service: BackendService, public recentCall: SharedDataService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {

    this.bus.queueUpdates.subscribe((queueUpdates) => {
      this.queueUpdates = queueUpdates;
    });

    this.bus.task.subscribe((task) => {
      if (task === null || task === undefined) {
        this.taskAssigned = false;
        this.callduration = 0;
        this.wrapupduration = 0;
        this.pausewrapupTimer();
      } else {
        this.taskAssigned = true;
      }

      this.task = task;
      if (this.task && this.task.call.attributes.destconnectedlinenum) {
        this.callduration = 0;
        this.wrapupduration = 0;
        this.startTimer();
      }

    });

    this.bus.hangup.subscribe(() => {
      this.pauseTimer();
      this.wrapupTimer();
    });

    this.bus.agentInfo.subscribe((res) => {
      this.info = res;
      const logindate = new Date(this.info.firstLogin);
      localStorage.setItem('logindate', logindate.toDateString());
    });

    const firstlogin = localStorage.getItem('logindate');
    if (firstlogin === this.cdate.toDateString()) {
      const getcalllog = JSON.parse(localStorage.getItem('newcalllog'));
      this.recentCall.calllog = getcalllog;
    }

  }

  GetDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    const hDisplay = h > 0 ? h + (h === 1 ? ' h ' : ' h ') : '';
    const mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' min ') : '';
    const sDisplay = s > 0 ? s + (s === 1 ? ' s' : ' s') : '';
    return hDisplay + mDisplay + sDisplay;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.callduration++;
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  wrapupTimer() {
    this.hangupcalled = false;
    this.wrapinterval = setInterval(() => {
      this.wrapupduration++;
    }, 1000);
  }

  pausewrapupTimer() {
    clearInterval(this.wrapinterval);
  }



}

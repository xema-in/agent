import { Component, OnInit } from '@angular/core';
import { QueueUpdate } from 'src/app/_interfaces/queue-update';
import { BackendService } from 'src/app/_shared/backend.service';
import { SharedDataService } from 'src/app/_shared/shared-data.service';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-agent-status',
  templateUrl: './agent-status.component.html',
  styleUrls: ['./agent-status.component.css'],
})
export class AgentStatusComponent implements OnInit {
  bus: ServerConnection;
  info: any;
  time: any;
  duration: any;
  cdate = new Date();
  task: any;
  taskAssigned: boolean;
  currentprogress: any;
  completed: any;
  interval;
  phoneState: any;
  queueUpdates: Array<QueueUpdate> = [];
  crms: any;
  nodata = true;
  color: string;
  ahtTarget: number;
  expression = 'Var3=Name;!Var4;!Var5';
  variables = {
    Var1: 'Chennai',
    Var2: '9123456789',
    Var3: 'James Bond',
    Var4: 'Password',
    Var5: 'Secret',
  };

  expressions: any;
  filteredvariables: {
    key: string;
    value: string;
  }[] = [];

  constructor(
    private service: BackendService,
    public recentCall: SharedDataService
  ) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.bus.queueUpdates.subscribe((queueUpdates) => {
      this.queueUpdates = queueUpdates;
    });

    this.bus.task.subscribe((task) => {
      if (task === null || task === undefined) {
        this.taskAssigned = false;
        this.ahtTarget = null;
        clearInterval(this.interval);
        this.currentprogress = 0;
        this.completed = null;
      } else {
        this.taskAssigned = true;
      }

      this.task = task;
      this.crms = [];
      this.nodata = true;
      if (
        this.task &&
        this.task.queue &&
        this.task.queue.crms &&
        this.task.queue.crms.length > 0
      ) {
        this.crms = this.task.queue.crms;
        this.nodata = false;
      }

      if (this.task && this.task.variables) {
        this.GetVariable();
      }

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

    this.bus.info.subscribe((res) => {
      this.info = res;
    });

    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
      switch (this.phoneState.state) {
        case 'Unknown':
          clearInterval(this.interval);
          break;
        case 'INUSE':
          break;
        case 'Not in use':
          clearInterval(this.interval);
        case 'NOT_INUSE':
          clearInterval(this.interval);
          break;
        default:
          break;
      }
    });
  }

  GetVariable() {
    this.filteredvariables = [];
    this.expressions = this.task.baseQueueOptions?.agentChannelVariablesExpression.split(
      ';'
    );
    for (let key of Object.keys(this.task.variables)) {
      const varkey = this.expressions
        ? this.expressions.filter((x) => x.includes(key))[0]
        : null;
      if (!varkey) {
        this.filteredvariables.push({
          key: key,
          value: this.task.variables[key],
        });
      }
      if (varkey) {
        const lable = varkey.split('=');
        if (lable[1]) {
          this.filteredvariables.push({
            key: lable[1],
            value: this.task.variables[key],
          });
        }
      }
    }
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

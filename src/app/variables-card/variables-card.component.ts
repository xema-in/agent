import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-variables-card',
  templateUrl: './variables-card.component.html',
  styleUrls: ['./variables-card.component.scss']
})
export class VariablesCardComponent implements OnInit {
  bus: ServerConnection;

  task: any;
  expressions: any;
  filteredvariables: {
    key: string;
    value: string;
  }[] = [];

  constructor(service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.bus.task.subscribe((task) => {
      this.task = task;
      if (this.task && this.task.variables) {
        this.GetVariable();
      }
    });

  }

  GetVariable() {
    this.filteredvariables = [];
    this.expressions = this.task.baseQueueOptions?.agentChannelVariablesExpression.split(';');
    for (let key of Object.keys(this.task.variables)) {
      const varkey = this.expressions ? this.expressions.filter((x) => x.includes(key))[0] : null;
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

}

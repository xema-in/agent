import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from '../_shared/backend.service';
import * as Collections from 'typescript-collections';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-variables-card',
  templateUrl: './variables-card.component.html',
  styleUrls: ['./variables-card.component.scss']
})
export class VariablesCardComponent implements OnInit {

  taskSubscription: any;
  bus: ServerConnection;
  task: any;

  filteredvariables: {
    key: string;
    value: string;
  }[] = [];

  constructor(service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {

    this.taskSubscription = this.bus.task.subscribe((task) => {
      this.task = task;
      if (this.task && this.task.variables) {
        this.transformVariables();
      }
    });

  }

  transformVariables() {
    this.filteredvariables = [];

    var vars = new Collections.Dictionary<string, string>();

    for (let key of Object.keys(this.task.variables)) {
      vars.setValue(key, this.task.variables[key]);
    }

    if (this.task.queue?.agentChannelVariablesExpression != null) {
      let expressions: string[] = this.task.queue?.agentChannelVariablesExpression.split(';');
      expressions.forEach(element => {
        let parts = element.split('=');
        let varName = parts[0];
        if (varName.startsWith('!')) {
          vars.remove(varName.substr(1));
        } else if (parts.length > 1) {
          if (vars.containsKey(varName)) {
            let newName = parts[1];
            let currentValue = vars.getValue(varName);
            vars.remove(varName);
            vars.setValue(newName, currentValue);
          }
        }
      });
    }

    for (let key of Object.keys(this.task.varAltNames)) {
      let varName = key;
      if (vars.containsKey(varName)) {
        let newName = this.task.varAltNames[varName];
        let currentValue = vars.getValue(varName);
        vars.remove(varName);
        vars.setValue(newName, currentValue);
      }
    }

    vars.forEach((key, value) => {
      this.filteredvariables.push({ key: key, value: value });
    });

    console.log(this.filteredvariables);

    // this.filteredvariables.sort((a, b) => (a.key < b.key ? -1 : 1));
    this.filteredvariables.sort((a, b) => {
      return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
    });

  }

}

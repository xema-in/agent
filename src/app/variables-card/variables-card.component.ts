import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-variables-card',
  templateUrl: './variables-card.component.html',
  styleUrls: ['./variables-card.component.css']
})
export class VariablesCardComponent implements OnInit {

  filteredvariables: {
    key: string;
    value: string;
  }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}

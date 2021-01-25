import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  showFiller = false;
  constructor() { }

  ngOnInit() {
    window.addEventListener('beforeunload', function (e) {
      const confirmationMessage = '\o/';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });
  }

}

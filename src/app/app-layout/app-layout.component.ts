import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {

  showFiller = false;
  constructor() { }

  ngOnInit() {
    if (environment.production) {
      window.addEventListener('beforeunload', function (e) {
        const confirmationMessage = '\o/';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      });
    }
  }

}

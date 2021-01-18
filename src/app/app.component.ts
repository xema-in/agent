import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from './_shared/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: BackendService, private router: Router) {

    this.service.appState.subscribe((state) => {

      switch (state.state) {

        case 'Unknown': {
          this.router.navigateByUrl('/server');
          break;
        }

        case 'ServerFound': {
          this.router.navigateByUrl('/login');
          break;
        }

        case 'LoggedIn': {
          this.router.navigateByUrl('/connect');
          // this.service.connect();
          break;
        }

        case 'Connected': {
          this.router.navigateByUrl('/phone');
          break;
        }

        case 'Ready': {
          const bus = this.service.getServerConnection();
          bus.refreshPhoneState();
          bus.getAgentInfo();
          this.router.navigateByUrl('/');
          break;
        }

        default: {
          console.log('Unhandled App State: ' + state.state);
          break;
        }

      }

    });

  }

}

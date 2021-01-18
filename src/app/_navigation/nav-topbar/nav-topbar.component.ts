import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from '../../_shared/backend.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/_shared/shared-data.service';
import { ServerConnection } from 'jema';
import { BreakState } from 'jema/lib/_interfaces/break-state';

@Component({
  selector: 'app-nav-topbar',
  templateUrl: './nav-topbar.component.html',
  styleUrls: ['./nav-topbar.component.css']
})
export class NavTopbarComponent implements OnInit {

  bus: ServerConnection;
  phoneState: any;
  breakState: BreakState;

  constructor(private service: BackendService, private router: Router, public shared: SharedDataService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {

    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
    });

    this.bus.breakState.subscribe((state) => {
      this.breakState = state;
    });

  }

  Logoff() {
    // this.bus.logout().subscribe(
    //   data => {
    //     this.service.setAppState({ state: 'Unknown' });
    //     localStorage.removeItem('access_token');
    //     this.router.navigateByUrl('/login');
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );

    this.service.setAppState({ state: 'Unknown' });
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/login');

  }

  askBreak() {
    this.bus.askBreak();
  }

  cancelBreak() {
    this.bus.cancelBreak();
  }

  exitBreak() {
    this.bus.exitBreak();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { ServerConnection } from 'jema';
import { BreakRequestDialogComponent } from '../break-request-dialog/break-request-dialog.component';
import { BackendService } from '../_shared/backend.service';

@Component({
  selector: 'app-break-logout-control',
  templateUrl: './break-logout-control.component.html',
  styleUrls: ['./break-logout-control.component.scss']
})
export class BreakLogoutControlComponent implements OnInit {

  bus: ServerConnection;
  breakState: any;
  info: any;

  constructor(private service: BackendService, private router: Router, public dialog: MatDialog) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {
    this.bus.breakState.subscribe((state) => {
      this.breakState = state;
    });

    this.bus.info.subscribe((info) => {
      this.info = info;
    });
  }

  askBreak() {
    const dialogRef = this.dialog.open(BreakRequestDialogComponent, {
      data: { info: this.info },
      disableClose: true,
      width: '400px',
    });
  }

  cancelBreak() {
    this.bus.cancelBreak();
  }

  exitBreak() {
    this.bus.exitBreak();
  }

  logoff() {
    this.service.disconnect();
  }

}

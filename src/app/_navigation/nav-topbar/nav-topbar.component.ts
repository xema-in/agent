import { Component, OnInit, Input } from "@angular/core";
import { BackendService } from "../../_shared/backend.service";
import { Router } from "@angular/router";
import { SharedDataService } from "src/app/_shared/shared-data.service";
import { ServerConnection } from "jema";
import { MatDialogComponent } from "src/app/mat-dialog/mat-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-nav-topbar",
  templateUrl: "./nav-topbar.component.html",
  styleUrls: ["./nav-topbar.component.css"],
})
export class NavTopbarComponent implements OnInit {
  bus: ServerConnection;
  phoneState: any;
  breakState: any;
  info: any;

  constructor(
    private service: BackendService,
    private router: Router,
    public shared: SharedDataService,
    public dialog: MatDialog
  ) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
    });

    this.bus.breakState.subscribe((state) => {
      this.breakState = state;
    });

    this.bus.agentInfo.subscribe((res) => {
      this.info = res;
    });
  }

  Logoff() {
    // this.bus.logout().subscribe(
    //   data => {
    //     this.service.setAppState({ state: 'Unknown' });
    //     this.router.navigateByUrl('/login');
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );

    this.service.setAppState({ state: "Unknown", connected: false });
    this.router.navigateByUrl("/login");
  }

  askBreak() {
    const dialogRef = this.dialog.open(MatDialogComponent, {
      data: { info: this.info },
      disableClose: true,
    });
  }

  cancelBreak() {
    this.bus.cancelBreak();
  }

  exitBreak() {
    this.bus.exitBreak();
  }
}

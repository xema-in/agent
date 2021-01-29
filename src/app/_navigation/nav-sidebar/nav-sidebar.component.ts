import { Component, OnInit } from '@angular/core';
import { CallhistoryDialogComponent } from 'src/app/_components/callhistory-dialog/callhistory-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-nav-sidebar',
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.css'],
})
export class NavSidebarComponent implements OnInit {
  showFiller = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  callhistory() {
    const dialogRef = this.dialog.open(CallhistoryDialogComponent, {
      data: '',
      disableClose: true,
    });
  }
}

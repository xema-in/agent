import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogComponent } from 'src/app/mat-dialog/mat-dialog.component';

@Component({
  selector: 'app-callhistory-dialog',
  templateUrl: './callhistory-dialog.component.html',
  styleUrls: ['./callhistory-dialog.component.css'],
})
export class CallhistoryDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MatDialogComponent>
  ) {}

  ngOnInit(): void {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}

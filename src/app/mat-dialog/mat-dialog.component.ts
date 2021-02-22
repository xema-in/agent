import { Component, OnInit, Inject } from "@angular/core";
import { BackendService } from "../_shared/backend.service";
import { SharedDataService } from "../_shared/shared-data.service";
import { ServerConnection } from "jema";
import { ErrorStateMatcher } from "@angular/material/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroupDirective, NgForm, Validators } from "@angular/forms";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: "app-mat-dialog",
  templateUrl: "./mat-dialog.component.html",
  styleUrls: ["./mat-dialog.component.scss"],
})
export class MatDialogComponent implements OnInit {
  bus: ServerConnection;

  breaktype = new FormControl("", [Validators.required]);
  reason = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MatDialogComponent>,
    private service: BackendService,
    public recentCall: SharedDataService
  ) {
    this.bus = service.getServerConnection();
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() { }

  onChangeType(event): void {
    const breaktype = event;
    if (breaktype !== 0) {
      this.reason.setValue("");
      this.reason.clearValidators();
      this.reason.updateValueAndValidity();
    }
    if (breaktype === 0) {
      this.reason.setValidators([Validators.required]);
      this.reason.updateValueAndValidity();
    }
  }

  Submit() {
    if (
      (this.breaktype.value !== 0 && this.breaktype.valid) ||
      (this.breaktype.value === 0 && this.reason.valid)
    ) {
      this.bus.askBreak2(this.breaktype.value, this.reason.value);
      this.onConfirmClick();
    }
  }
}

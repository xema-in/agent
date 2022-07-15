import { Component, OnInit, Inject } from "@angular/core";
import { BackendService } from "../_shared/backend.service";
import { ServerConnection } from "jema";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "break-request-dialog",
  templateUrl: "./break-request-dialog.component.html",
  styleUrls: ["./break-request-dialog.component.scss"],
})
export class BreakRequestDialogComponent implements OnInit {
  bus: ServerConnection;

  breakRequestForm = this.fb.group({
    breaktype: new FormControl<any>(null, Validators.required),
    reason: new FormControl<any>({ value: null, disabled: true }, Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BreakRequestDialogComponent>,
    service: BackendService,
    private fb: FormBuilder
  ) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
  }

  onChangeType(): void {
    if (this.breakRequestForm.value.breaktype.btCode === 0)
      this.breakRequestForm.controls['reason'].enable();
    else {
      this.breakRequestForm.controls['reason'].disable();
      this.breakRequestForm.controls['reason'].setValue(null);
    }

  }

  Submit() {
    let reason = '';
    if (this.breakRequestForm.value.breaktype.btCode === 0) {
      reason = this.breakRequestForm.value.reason;
    } else {
      reason = this.breakRequestForm.value.breaktype.name;
    }

    this.bus.askBreak2(this.breakRequestForm.value.breaktype.btCode, reason);

    this.dialogRef.close(true);

  }


}

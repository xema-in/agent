import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { BackendService } from '../_shared/backend.service';
import { SharedDataService } from '../_shared/shared-data.service';
import { ServerConnection } from 'jema';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css']
})
export class MatDialogComponent implements OnInit {

  Task: any;
  bus: ServerConnection;
  phoneState: any;
  hods: any;
  subjects: any;
  subsubjects: any;
  calldetails: any;
  cdate = new Date();


  callid = new FormControl('', [
    Validators.required
  ]);
  id = new FormControl('', [
    Validators.required
  ]);
  disposition = new FormControl('', [
    Validators.required
  ]);

  department = new FormControl('', [
    Validators.required
  ]);

  hod = new FormControl('', [
    Validators.required
  ]);

  subject = new FormControl('', [
    Validators.required
  ]);

  subsubject = new FormControl('', [
    Validators.required
  ]);
  remarks = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<MatDialogComponent>, private service: BackendService, public recentCall: SharedDataService) {
    this.bus = service.getServerConnection();

    if (data) {
      this.Task = data.task;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {

    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
    });

  }

  onChangeDept(event): void {
    const departmentId = event.Value;
    this.hods = this.Task.queue.hods.filter(x => x.departmentId === departmentId);
  }

  onChangeHod(event): void {
    const hodId = event.Value;
    this.subjects = this.Task.queue.subjects.filter(x => x.hodId === hodId);
  }

  onChangeSubject(event): void {
    const subjectId = event.Value;
    this.subsubjects = this.Task.queue.subSubjects.filter(x => x.subjectId === subjectId);
  }

  // Submit() {
  //   if (this.disposition.value && this.department.value.Name
  //     && this.hod.value.Name && this.subject.value.Name
  //     && this.subsubject.value.Name && this.remarks.value) {
  //     this.service.calldispositions({
  //       Disposition: this.disposition.value,
  //       Department: this.department.value.Name,
  //       Hod: this.hod.value.Name,
  //       Subject: this.subject.value.Name,
  //       SubSubject: this.subsubject.value.Name,
  //       CallId: this.callid.value,
  //       Remarks: this.remarks.value
  //     }).subscribe(
  //       data => {
  //         this.calldetails = data;
  //         if (this.calldetails) {
  //           const callrec: CallInfo = {
  //             queue: this.calldetails.queue,
  //             callNumber: this.calldetails.callNumber,
  //             cli: this.calldetails.cli,
  //             startTime: this.calldetails.startTime,
  //             endTime: this.calldetails.endTime,
  //             remarks: this.calldetails.remarks
  //           };

  //           const calllist = JSON.parse(localStorage.getItem('newcalllist')) || [];
  //           calllist.push(callrec);
  //           localStorage.setItem('newcalllist', JSON.stringify(calllist));
  //           const callinfo = JSON.parse(localStorage.getItem('newcalllist'));
  //           this.recentCall.callinfolist = callinfo.slice(Math.max(callinfo.length - 5, 0)).reverse();
  //           localStorage.removeItem('newcalllist');
  //           localStorage.setItem('newcalllist', JSON.stringify(callinfo.slice(Math.max(callinfo.length - 5, 0))));

  //           const calllog: CallLog = {
  //             call: this.calldetails.call,
  //             callDuration: this.calldetails.callDuration,
  //             callWrapupDuration: this.calldetails.callWrapupDuration,
  //           };

  //           const setcalllog = JSON.parse(localStorage.getItem('newcalllog'));
  //           if (setcalllog) {
  //             setcalllog.call = setcalllog != null ? setcalllog.call + calllog.call : calllog.call;
  //             setcalllog.callDuration = setcalllog != null ? setcalllog.callDuration + calllog.callDuration :
  //               calllog.callDuration;
  //             setcalllog.callWrapupDuration = setcalllog != null ? setcalllog.callWrapupDuration
  //               + calllog.callWrapupDuration : calllog.callWrapupDuration;

  //             localStorage.setItem('newcalllog', JSON.stringify(setcalllog));
  //           } else {
  //             localStorage.setItem('newcalllog', JSON.stringify(calllog));
  //           }
  //           const firstlogin = localStorage.getItem('logindate');
  //           if (firstlogin === this.cdate.toDateString()) {
  //             const getcalllog = JSON.parse(localStorage.getItem('newcalllog'));
  //             this.recentCall.calllog = getcalllog;
  //           }


  //         }
  //         Swal.fire(
  //           '',
  //           'Call wrap-up successful',
  //           'success',
  //         ).then(() => {
  //           this.bus.dispose();
  //           if (this.recentCall.pause) {
  //             this.bus.pause();
  //           }
  //         });
  //         this.dialogRef.close(true);
  //       },
  //       err => {
  //         console.error(err);
  //         Swal.fire({
  //           type: 'error',
  //           title: 'Oops...',
  //           text: err.error.text,
  //         });
  //       }
  //     );
  //   }
  // }
}

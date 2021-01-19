import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ActiveCall } from 'src/app/_interfaces/active-call';
import { Channel } from 'src/app/_interfaces/channel';
import { SharedDataService } from 'src/app/_shared/shared-data.service';
import { CallInfo, CallLog } from 'src/app/_interfaces/call-info';
import { ServerConnection } from 'jema';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-disposition-tools',
  templateUrl: './disposition-tools.component.html',
  styleUrls: ['./disposition-tools.component.css']
})
export class DispositionToolsComponent implements OnInit {

  bus: ServerConnection;
  ongoingCallsList: Array<ActiveCall>;
  parkedCallsList: Array<Channel>;
  callerOnline: boolean;
  task: any;
  taskAssigned: boolean;
  selectedvalue: any;
  selectedtext: any;
  parked: any;
  cdate = new Date();
  calldetails: any;
  disable: boolean;
  number = new FormControl('', [
    // Validators.required
  ]);
  queueCall: any;

  matcher = new MyErrorStateMatcher();

  constructor(private service: BackendService, public shared: SharedDataService,
    public dialog: MatDialog, public recentCall: SharedDataService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.disable = false;

    this.bus.task.subscribe((task) => {
      if (task === null || task === undefined) {
        this.taskAssigned = false;
      } else {
        this.taskAssigned = true;
        this.disable = false;
      }
      this.task = task;
    });

    this.bus.ongoingCalls.subscribe((list) => {
      this.ongoingCallsList = list;
      if (this.task !== null && this.task !== undefined) {
        if (list.find(x => x.cli === this.task.call.attributes.calleridnum)) {
          this.callerOnline = true;
        } else {
          this.callerOnline = false
            ;
          // this.autoDispose();
        }
      }
    });

    this.bus.parkedChannels.subscribe((list) => {
      this.parkedCallsList = list;
      this.parked = this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : '';
    });

    this.bus.task.subscribe((queueCall) => {
      this.queueCall = queueCall;

      if (this.queueCall && this.queueCall.queue && this.queueCall.queue.crmUrls && this.queueCall.queue.crmUrls.length > 0) {
        this.openNewtab();
      }
    });

    const callinfo = JSON.parse(localStorage.getItem('newcalllist'));
    if (callinfo) {
      this.recentCall.callinfolist = callinfo.slice(Math.max(callinfo.length - 5, 0)).reverse();
    }

  }

  openNewtab() {
    this.queueCall.queue.crmUrls.forEach((item, index) => {
      window.open(item, index);
    });
  }


  callBack() {
    this.bus.call(this.task.queue.callbackTrunk, this.task.call.attributes.calleridnum, this.task.call.attributes.linkedid);
  }

  endCall() {
    // check if the original call is active
    if (this.ongoingCallsList.find(x => x.remoteChannel === this.task.call.channel)) {
      this.bus.hangupCall(this.task.call.channel);
    } else {
      // find the channel and disconnect
      const ch = this.ongoingCallsList.find(x => x.cli === this.task.call.attributes.calleridnum);
      if (ch !== undefined) {
        this.bus.hangupCall(ch.remoteChannel);
      }
    }
    this.parked = '';
  }

  call() {
    this.bus.call(this.task.queue.callbackTrunk, this.number.value, this.task.call.attributes.linkedid);
    this.parked = this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : '';
  }

  conference() {
    this.ongoingCallsList.forEach(otherCall => {
      this.bus.hold(otherCall.remoteChannel);
    });

    const listActive = this.ongoingCallsList.map(x => x.remoteChannel);
    const listParked = this.parkedCallsList.map(x => x.channel);
    const total = listActive.concat(listParked);

    this.bus.conference(total);
    this.parked = this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : '';
  }


  dispose() {
    if (this.task.call.attributes.linkedid) {
      this.disable = true;
      this.bus.calldispositions({
        CallId: this.task.call.attributes.linkedid,
      }).subscribe(
        data => {
          this.calldetails = data;
          if (this.calldetails) {
            const callrec: CallInfo = {
              queue: this.calldetails.queue,
              callNumber: this.calldetails.callNumber,
              cli: this.calldetails.cli,
              startTime: this.calldetails.startTime,
              endTime: this.calldetails.endTime,
            };
            const calllist = JSON.parse(localStorage.getItem('newcalllist')) || [];
            calllist.push(callrec);
            localStorage.setItem('newcalllist', JSON.stringify(calllist));
            const callinfo = JSON.parse(localStorage.getItem('newcalllist'));
            this.shared.callinfolist = callinfo.slice(Math.max(callinfo.length - 5, 0)).reverse();
            localStorage.removeItem('newcalllist');
            localStorage.setItem('newcalllist', JSON.stringify(callinfo.slice(Math.max(callinfo.length - 5, 0))));

            const calllog: CallLog = {
              call: this.calldetails.call,
              callDuration: this.calldetails.callDuration,
              callWrapupDuration: this.calldetails.callWrapupDuration,
            };

            const setcalllog = JSON.parse(localStorage.getItem('newcalllog'));
            if (setcalllog) {
              setcalllog.call = setcalllog != null ? setcalllog.call + calllog.call : calllog.call;
              setcalllog.callDuration = setcalllog != null ? setcalllog.callDuration + calllog.callDuration :
                calllog.callDuration;
              setcalllog.callWrapupDuration = setcalllog != null ? setcalllog.callWrapupDuration
                + calllog.callWrapupDuration : calllog.callWrapupDuration;

              localStorage.setItem('newcalllog', JSON.stringify(setcalllog));
            } else {
              localStorage.setItem('newcalllog', JSON.stringify(calllog));
            }
            const firstlogin = localStorage.getItem('logindate');
            if (firstlogin === this.cdate.toDateString()) {
              const getcalllog = JSON.parse(localStorage.getItem('newcalllog'));
              this.shared.calllog = getcalllog;
            }
          }

          this.bus.dispose();
          this.disable = false;
        },
        err => {
          this.bus.dispose();
          this.disable = false;
          console.error(err);
          // Swal.fire({
          //   type: 'error',
          //   title: 'Oops...',
          //   text: err.error.text,
          // });
        }
      );
    }
  }




  // autoDispose() {
  //   setTimeout(() => {
  //   if (!this.callerOnline && this.parked !== 'Parked') {
  //      this.bus.dispose();
  //     if (this.shared.pause) {
  //       this.bus.pause();
  //     }
  //    }
  //   }, 60000);
  // }

}

import { Component, OnInit } from "@angular/core";
import { BackendService } from "src/app/_shared/backend.service";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ActiveCall } from "src/app/_interfaces/active-call";
import { Channel } from "src/app/_interfaces/channel";
import { ServerConnection } from "jema";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatDialog } from "@angular/material/dialog";
import Swal from "sweetalert2";
import { Conference } from "jema/lib/_interfaces/conference";

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
  selector: "app-disposition-tools",
  templateUrl: "./disposition-tools.component.html",
  styleUrls: ["./disposition-tools.component.scss"],
})
export class DispositionToolsComponent implements OnInit {
  bus: ServerConnection;
  ongoingCallsList: Array<ActiveCall>;
  parkedCallsList: Array<Channel>;
  conferenceCall: Conference;
  callerOnline: boolean;
  task: any;
  taskAssigned: boolean;
  selectedvalue: any;
  selectedtext: any;
  parked: any;
  cdate = new Date();
  calldetails: any;
  disable: boolean;
  number = new FormControl("", [
    // Validators.required
  ]);
  queueCall: any;
  isCallBack: boolean;
  isNewCall: boolean;
  isMerge: boolean;
  isEndCall: boolean;
  isDispose: boolean;
  phoneState: any;

  matcher = new MyErrorStateMatcher();

  constructor(
    private service: BackendService,
    public dialog: MatDialog,
  ) {
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
      if (this.task && this.task.queue.allowEndCall) {
        this.isEndCall = true;
      }
      if (this.task && this.task.queue.allowCallback) {
        this.isCallBack = true;
      }
    });

    this.bus.ongoingCalls.subscribe((list) => {
      this.ongoingCallsList = list;
      if (this.task !== null && this.task !== undefined) {
        if (list.find((x) => x.cli === this.task.call.attributes.calleridnum)) {
          this.callerOnline = true;
        } else {
          this.callerOnline = false;
          // this.autoDispose();
        }
      }
    });

    this.bus.parkedChannels.subscribe((list) => {
      this.parkedCallsList = list;
      this.parked =
        this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";

      if (this.parked == 'Parked') {
        this.isCallBack = false;
        this.isDispose = false;
        this.isEndCall = false;
        this.isNewCall = true;
      }
      else {
        this.isNewCall = false;
        this.isEndCall = true;
        this.isDispose = false;
      }
    });

    this.bus.conferenceCall.subscribe((call) => {
      this.conferenceCall = call;
      if (this.conferenceCall?.members.length > 0) {
        this.isNewCall = true;
        this.isDispose = false;
      } else {
        this.isNewCall = false;
        this.isDispose = true;
      }
    });

    this.bus.task.subscribe((queueCall) => {
      this.queueCall = queueCall;
      if (
        this.queueCall &&
        this.queueCall.queue &&
        this.queueCall.queue.crms &&
        this.queueCall.queue.crms.length > 0
      ) {
        this.openNewtab();
      }
    });

    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
      switch (this.phoneState.state) {
        case "Unknown":
          if (this.task && this.task.queue.allowEndCall) {
            this.isEndCall = false;
          }
          if (this.task && this.task.queue.allowCallback) {
            this.isCallBack = true;
            this.isDispose = true;
          }
          break;
        case "INUSE":
          if (this.task && this.task.queue.allowCallback) {
            this.isCallBack = false;
            this.isDispose = false;
          }
          break;
        case "Not in use":
        case "NOT_INUSE":
          if (this.task && this.task.queue.allowEndCall) {
            this.isEndCall = false;
          }
          if (this.task && this.task.queue.allowCallback) {
            this.isCallBack = true;
            this.isDispose = true;
          }
          break;
        default:
          break;
      }
    });

  }

  openNewtab() {
    this.queueCall.queue.crms.forEach((item, index) => {
      window.open(item.url, index);
    });
  }

  callBack() {
    if (this.task.queue.allowEndCall) {
      this.isEndCall = true;
    }
    this.bus.call(
      this.task.queue.callbackTrunkName,
      this.task.call.attributes.calleridnum,
      this.task.call.attributes.linkedid
    );
  }

  endCall() {
    // find all channels in ConfBridge & hangup
    if (this.ongoingCallsList.length !== 0) {
      this.ongoingCallsList.forEach((channel) => {
        const localchannel = channel.localChannel;
        const rmchannels = channel.remoteChannel.split(",");
        const removeconf = rmchannels.shift();
        rmchannels.push(localchannel);
        if (rmchannels) {
          rmchannels.forEach((ch) => {
            this.bus.hangupCall(ch);
          });
        }
      });

      this.isEndCall = false;
      this.isMerge = false;
      this.isDispose = true;
    }

    this.bus.parkedChannels.subscribe((list) => {
      this.parkedCallsList = list;
      this.parked =
        this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
      if (this.parked == 'Parked') {
        this.isDispose = false;
        this.isNewCall = true;
      }
    });

    // check if the original call is active
    if (
      this.ongoingCallsList.find(
        (x) => x.remoteChannel === this.task.call.channel
      )
    ) {
      this.bus.hangupCall(this.task.call.channel);
    } else {
      // find the channel and disconnect
      const ch = this.ongoingCallsList.find(
        (x) => x.cli === this.task.call.attributes.calleridnum
      );
      if (ch !== undefined) {
        this.bus.hangupCall(ch.remoteChannel);
      }
    }
    // this.parked = "";
  }

  call() {
    if (this.task.queue.allowEndCall) {
      this.isEndCall = true;
    }
    this.bus.call(
      this.task.queue.callbackTrunkName,
      this.number.value,
      this.task.call.attributes.linkedid
    );
    this.isMerge = true;
    this.isNewCall = true;

    if (this.parkedCallsList != undefined && this.parkedCallsList != null &&
      this.parkedCallsList.length > 0)
      this.parked = this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
    else
      this.parked = "";
  }

  call1() {
    Swal.fire({
      title: 'Phone Number',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Call',
      showLoaderOnConfirm: true,
      preConfirm: (number) => {
        this.number.setValue(number);
        this.call();
      },
    });
  }

  conference() {
    this.ongoingCallsList.forEach((otherCall) => {
      this.bus.hold(otherCall.remoteChannel);
    });
    const listActive = this.ongoingCallsList.map((x) => x.remoteChannel);
    const listParked = this.parkedCallsList.map((x) => x.channel);
    const total = listActive.concat(listParked);
    this.bus.conference(total);
    this.parked =
      this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
  }

  dispose() {
    this.bus.dispose();
    this.disable = false;
  }
}

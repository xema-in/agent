import { Component, OnInit } from "@angular/core";
import { BackendService } from "src/app/_shared/backend.service";
import { MatDialog, ErrorStateMatcher } from "@angular/material";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ActiveCall } from "src/app/_interfaces/active-call";
import { Channel } from "src/app/_interfaces/channel";
import { SharedDataService } from "src/app/_shared/shared-data.service";
import { CallInfo, CallLog } from "src/app/_interfaces/call-info";
import { ServerConnection } from "jema";

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
  styleUrls: ["./disposition-tools.component.css"],
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
  number = new FormControl("", [
    // Validators.required
  ]);
  queueCall: any;
  isCallBack: boolean;
  isEndCall: boolean;
  phoneState: any;

  matcher = new MyErrorStateMatcher();

  constructor(
    private service: BackendService,
    public shared: SharedDataService,
    public dialog: MatDialog,
    public recentCall: SharedDataService
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
      if (this.task && this.task.queue.baseQueueOptions.allowEndCall) {
        this.isEndCall = true;
      }
      if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
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
          if (this.task && this.task.queue.baseQueueOptions.allowEndCall) {
            this.isEndCall = false;
          }
          if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
            this.isCallBack = true;
          }
          break;
        case "INUSE":
          if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
            this.isCallBack = false;
          }
          break;
        case "Not in use":
        case "NOT_INUSE":
          if (this.task && this.task.queue.baseQueueOptions.allowEndCall) {
            this.isEndCall = false;
          }
          if (this.task && this.task.queue.baseQueueOptions.allowCallback) {
            this.isCallBack = true;
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
    if (this.task.queue.baseQueueOptions.allowEndCall) {
      this.isEndCall = true;
    }
    this.bus.call(
      this.task.queue.baseQueueOptions.callbackTrunkName,
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
      this.isCallBack = true;
    }

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
    this.parked = "";
  }

  call() {
    if (this.task.queue.baseQueueOptions.allowEndCall) {
      this.isEndCall = true;
    }
    this.bus.call(
      this.task.queue.baseQueueOptions.callbackTrunkName,
      this.number.value,
      this.task.call.attributes.linkedid
    );
    this.parked =
      this.parkedCallsList[0] != null ? this.parkedCallsList[0].status : "";
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

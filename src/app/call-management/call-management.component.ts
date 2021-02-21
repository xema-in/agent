import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { ActiveCall } from 'src/app/_interfaces/active-call';
import { Conference } from 'src/app/_interfaces/conference';
import { Channel } from 'src/app/_interfaces/channel';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-call-management',
  templateUrl: './call-management.component.html',
  styleUrls: ['./call-management.component.scss'],
})
export class CallManagementComponent implements OnInit {
  bus: ServerConnection;
  ongoingCallsList: Array<ActiveCall>;
  parkedChannelsList: Array<Channel>;
  conferenceCall: Conference;
  unknown = '<unknown>';

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.bus.ongoingCalls.subscribe((list) => {
      this.ongoingCallsList = list;
    });

    this.bus.parkedChannels.subscribe((list) => {
      this.parkedChannelsList = list;
    });

    this.bus.conferenceCall.subscribe((call) => {
      this.conferenceCall = call;
    });
  }

  park(call: ActiveCall) {
    this.bus.hold(call.remoteChannel);
  }

  resume(call: Channel) {
    this.ongoingCallsList.forEach((otherCall) => {
      this.bus.hold(otherCall.remoteChannel);
    });
    this.bus.resume(call.channel);
  }

  getCli(cli) {
    const lastdigits = cli.slice(cli.length - 4);
    return lastdigits;
  }
}

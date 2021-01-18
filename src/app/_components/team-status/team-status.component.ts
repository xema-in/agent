import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import { TeamMemberState } from 'src/app/_interfaces/team-member-state';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit {
  bus: ServerConnection;
  teamMemberStates: Array<TeamMemberState> = [];
  total = 0;
  inCall = 0;
  wrapUp = 0;
  idle = 0;
  offline = 0;
  break = 0;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {

    this.bus.teamMemberStates.subscribe((data) => {
      this.teamMemberStates = data;
      this.total = this.teamMemberStates.length;
      this.inCall = this.teamMemberStates.filter(x => x.deviceStatus === 'In Call').length;
      this.wrapUp = this.teamMemberStates.filter(x => x.agentStatus === 'Wrap Up').length;
      this.idle = this.teamMemberStates.filter(x => x.deviceStatus === 'Idle').length;
      this.offline = this.teamMemberStates.filter(x => x.deviceStatus === 'Offline').length;
      this.break = this.teamMemberStates.filter(x => x.agentStatus === 'In Break').length;
    });

  }

  giveBreak() {
    alert('I am here to just irritate you!');
  }

}

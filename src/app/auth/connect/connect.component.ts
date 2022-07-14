import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ServerConnection } from 'jema';
import { BackendService } from 'src/app/_shared/backend.service';
import Swal from 'sweetalert2';

@UntilDestroy()
@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {

  server!: ServerConnection;
  reconnect!: boolean;

  constructor(private route: ActivatedRoute, private service: BackendService) {
    this.route.params.subscribe(params => {
      this.reconnect = params['reconnect'];
    });
  }

  ngOnInit() {
    this.service.setupServerConnection();
    this.server = this.service.getServerConnection();

    if (!this.reconnect)
      this.tryConnect();
  }

  tryConnect() {

    this.server.IsOnline().subscribe(
      () => {
        Swal.fire({
          icon: 'warning',
          title: 'Agent already connected!',
          text: 'It seems you have another active session. Please disconnect, if you would like to login here.',
          showDenyButton: true,
          denyButtonText: `Remote Logout`,
        }).then((result) => {
          if (result.isDenied) {
            this.server.RemoteLogout().subscribe(
              (data) => {
                Swal.fire({ icon: 'success', title: 'Remote Logout initiated successfully.' });
              },
              (err) => {
                Swal.fire({ icon: 'error', title: 'Oops...', text: err.message });
              }
            );
          }
        });
      },
      (err) => {
        this.server.connectionState
          .subscribe((connectionState) => {
            console.log(connectionState);
            if (connectionState.connected === true)
              this.service.setAppState({ state: 'Connected', connected: true });
          });

        this.service.connect();
      }
    );

  }

}

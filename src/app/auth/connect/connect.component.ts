import { Component, OnInit } from '@angular/core';
import { ServerConnection } from 'jema';
import { BackendService } from 'src/app/_shared/backend.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  server: ServerConnection;

  constructor(private service: BackendService) { }

  ngOnInit() {
    this.service.setupServerConnection();
    this.server = this.service.getServerConnection();

    this.tryConnect();
  }

  tryConnect() {

    this.server.IsOnline().subscribe(
      () => {
        Swal.fire({
          icon: 'warning',
          title: 'Agent already connected!',
          text: 'It seems you have another active session. Please disconnect, if you like to login here.',
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
        // console.log(err);
        this.server.connectionState.subscribe((connectionState) => {
          if (connectionState.connected === true)
            this.service.setAppState({ state: 'Connected' });
        });

        this.service.connect();
      }
    );

  }

}

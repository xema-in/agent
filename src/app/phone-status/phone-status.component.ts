import { Component, OnInit } from '@angular/core';
import { BackendService } from '../_shared/backend.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ServerConnection } from 'jema';
import { PhoneState } from 'jema/lib/_interfaces/phone-state';

@Component({
  selector: 'app-phone-status',
  templateUrl: './phone-status.component.html',
  styleUrls: ['./phone-status.component.scss'],
})
export class PhoneStatusComponent implements OnInit {
  bus: ServerConnection;
  phoneState!: PhoneState;
  onHook!: boolean;
  color!: string;

  constructor(private service: BackendService, private router: Router) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.bus.phoneState.subscribe((state) => {
      this.phoneState = state;
      this.onHook = true;
      switch (this.phoneState.state) {
        case 'Unknown':
          this.color = 'gray-button';
          break;
        case 'UNAVAILABLE':
          this.color = 'gray-button';
          break;
        case 'INUSE':
          this.onHook = false;
          this.color = 'red-button';
          break;
        case 'Not in use':
        case 'NOT_INUSE':
          this.color = 'green-button';
          break;
        default:
          this.color = 'blue-button';
          break;
      }
    });
  }

  unassignPhone() {
    if (!this.onHook) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This will change the phone you are currently using!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change',
    }).then((result) => {
      if (result.value) {
        this.bus.unassignPhone().subscribe(() => {
          this.router.navigateByUrl('/phone');
        });
      }
    });
  }
}

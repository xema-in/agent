import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BackendService } from 'src/app/_shared/backend.service';
import Swal from 'sweetalert2';
import { DeviceMapParameters } from 'src/app/_interfaces/device.map';
import { ServerConnection } from 'jema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-phone-selection',
  templateUrl: './phone-selection.component.html',
  styleUrls: ['./phone-selection.component.scss']
})
export class PhoneSelectionComponent implements OnInit {

  bus: ServerConnection;

  manager: string;
  isLoading = false;
  disable: boolean;

  public phoneSelectionForm: FormGroup = this.fb.group({
    deviceName: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')])]
  });

  constructor(private service: BackendService, private fb: FormBuilder) {
    this.bus = service.getServerConnection();
  }

  ngOnInit(): void {
    this.disable = false;
    this.manager = this.service.getBackendUrl();

    this.bus.IsPhoneMapped().subscribe(
      (data: any) => {
        this.reconnectDevice(data.phone);
      },
      () => {
        // console.error(err);
      }
    );

    if (!environment.production) {
      this.phoneSelectionForm.controls.deviceName.setValue(environment.dev.phone);
      setTimeout(() => { this.mapDevice(); }, 1000);
    }

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.phoneSelectionForm.controls[controlName].hasError(errorName);
  }

  mapDevice(): void {
    this.mapPhone(this.phoneSelectionForm.value);
  }

  reconnectDevice(phone: string): void {
    this.mapPhone({ deviceName: phone });
  }

  mapPhone(param: DeviceMapParameters): void {
    this.disable = true;
    this.isLoading = true;
    this.bus.mapPhone(param).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.service.setAppState({ state: 'Ready', connected: true });
        if (data.teamLead) {
          console.log('Enabling Team Lead features...');
          this.service.enableTeamLeadFeatures(true);
        }
        this.disable = false;
      },
      err => {
        this.isLoading = false;
        this.disable = false;
        if (err.response !== undefined) { err = err.response; }

        if (err.status === 400) {

          Swal.fire({
            icon: 'error',
            title: 'Error Activating Phone',
            text: err.data
          });

        } else {

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          });

        }

      }
    );

  }


}

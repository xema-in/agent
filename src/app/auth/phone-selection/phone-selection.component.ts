import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/_shared/backend.service';
import Swal from 'sweetalert2';
import { DeviceMapParameters } from 'src/app/_interfaces/device.map';
import { ManagerEnvironment } from 'src/app/_code/manager-environment';
import { ServerConnection } from 'jema';

@Component({
  selector: 'app-phone-selection',
  templateUrl: './phone-selection.component.html',
  styleUrls: ['./phone-selection.component.css']
})
export class PhoneSelectionComponent implements OnInit {

  bus: ServerConnection;
  public phoneSelectionForm: FormGroup;
  manager: string;
  isLoading = false;
  disable: boolean;

  constructor(private service: BackendService) {
    this.bus = service.getServerConnection();
  }

  ngOnInit() {
    this.disable = false;
    this.manager = ManagerEnvironment.getBackendUrl();

    this.bus.IsPhoneMapped().subscribe(
      (data: any) => {
        this.reconnectDevice(data.phone);
      },
      () => {
        // console.error(err);
      }
    );

    this.phoneSelectionForm = new FormGroup({
      deviceName: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]),
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.phoneSelectionForm.controls[controlName].hasError(errorName);
  }

  mapDevice() {
    this.mapPhone(this.phoneSelectionForm.value);
  }

  reconnectDevice(phone: string) {
    this.mapPhone({ deviceName: phone });
  }

  mapPhone(param: DeviceMapParameters) {
    this.disable = true;
    this.isLoading = true;
    this.bus.mapPhone(param).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.service.setAppState({ state: 'Ready' });
        if (data.teamLead) {
          console.log('Enabling Team Lead features...');
          this.service.enableTeamLeadFeatures(true);
        }
        this.disable = false;
      },
      err => {
        console.error(err);
        this.isLoading = false;
        this.disable = false;
        if (err.response !== undefined) { err = err.response; }

        if (err.status === 400) {

          Swal.fire({
            type: 'error',
            title: 'Error Activating Phone',
            text: err.data
          });

        } else {

          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: err.message
          });

        }

      }
    );

  }


}

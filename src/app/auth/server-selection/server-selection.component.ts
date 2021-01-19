import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BackendService } from 'src/app/_shared/backend.service';
import { ManagerEnvironment } from 'src/app/_code/manager-environment';
import { NetworkTester } from 'jema';

@Component({
  selector: 'app-server-selection',
  templateUrl: './server-selection.component.html',
  styleUrls: ['./server-selection.component.css']
})
export class ServerSelectionComponent implements OnInit {

  public serverSelectionForm: FormGroup = new FormGroup({
    serverIp: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  });

  tester = new NetworkTester();

  constructor(private service: BackendService) { }

  ngOnInit() {
    if (ManagerEnvironment.getBackendUrl() !== null &&
      ManagerEnvironment.getBackendUrl() !== undefined &&
      ManagerEnvironment.getBackendUrl() !== '') {
      this.service.setAppState({ state: 'ServerFound' });
    } else {
      const detectedServerName = location.hostname + (location.port ? ':' + location.port : '');
      const detectedProtocol = location.protocol;

      this.tester.ping(detectedProtocol + '//' + detectedServerName).subscribe(() => {
        this.serverSelectionForm.controls['serverIp'].setValue(detectedServerName);
      });

    }

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.serverSelectionForm.controls[controlName].hasError(errorName);
  }

  saveIpAddress() {
    let url = this.serverSelectionForm.value.serverIp;

    if (!url.startsWith('http:') && !url.startsWith('https:')) {
      url = location.protocol + '//' + url;
    }

    this.service.saveBackendIpAddress(url);
    this.service.setAppState({ state: 'ServerFound' });
  }


}

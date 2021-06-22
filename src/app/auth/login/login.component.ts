import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import Swal from 'sweetalert2';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Authenticator } from 'jema';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  manager: string;
  disable: boolean;

  public loginForm: FormGroup = this.fb.group({
    username: [null, Validators.compose([Validators.required, Validators.maxLength(60)])],
    password: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
  });

  constructor(private service: BackendService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.disable = false;
    this.manager = this.service.getBackendUrl();

    if (!environment.production) {
      this.loginForm.controls.username.setValue(environment.dev.username);
      this.loginForm.controls.password.setValue(environment.dev.password);
      this.submit();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  submit(): void {
    this.isLoading = true;
    this.disable = true;

    const auth = new Authenticator(this.service.getBackendUrl());
    auth.getAuthToken(this.loginForm.value).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.disable = false;
        this.service.saveToken(data.auth_token);
        this.service.setAppState({ state: 'LoggedIn', connected: false });
      },
      err => {
        this.isLoading = false;
        this.disable = false;
        if (err.response !== undefined) { err = err.response; }
        if (err.status === 401) {

          Swal.fire({
            icon: 'error',
            title: 'Authentication failed!',
            text: 'It seems you haven\'t entered valid credentials. Check your User Name and Password!'
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

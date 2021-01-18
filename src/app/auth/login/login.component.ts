import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/_shared/backend.service';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ManagerEnvironment } from 'src/app/_code/manager-environment';
import { Authenticator, ServerConnection } from 'jema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  manager: string;
  isLoading = false;
  disable: boolean;

  constructor(private service: BackendService) { }

  ngOnInit() {
    this.disable = false;
    this.manager = ManagerEnvironment.getBackendUrl();


    // this.service.IsAgentAuthenticated().subscribe(
    //   data => {
    //     this.bus.setAppState({ state: 'LoggedIn' });
    //   },
    //   err => {
    //     console.error(err);
    //   }
    // );

    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required, Validators.maxLength(60),
        // Validators.pattern('[a-zA-Z1-9]*')
      ]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  submit() {
    this.isLoading = true;
    this.disable = true;

    const auth = new Authenticator(ManagerEnvironment.getBackendUrl());
    auth.getAuthToken(this.loginForm.value).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.disable = false;
        this.service.saveToken(data.auth_token);
        this.service.setAppState({ state: 'LoggedIn' });
      },
      err => {
        this.isLoading = false;
        this.disable = false;
        if (err.response !== undefined) { err = err.response; }
        if (err.status === 401) {

          Swal.fire({
            type: 'error',
            title: 'Authentication failed!',
            text: 'It seems you haven\'t entered valid credentials. Check your User Name and Password!'
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

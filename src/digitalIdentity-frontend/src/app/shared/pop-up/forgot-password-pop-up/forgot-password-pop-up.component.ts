import { HttpParams } from '@angular/common/http';
import { Component, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-forgot-password-pop-up',
  templateUrl: './forgot-password-pop-up.component.html',
  styleUrls: ['./forgot-password-pop-up.component.css'],
})
export class ForgotPasswordPopUpComponent implements OnInit {
  formGroup: FormGroup;
  disabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordPopUpComponent>,
    public httpService: BackendHttpService
  ) {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  cancelButtonEvent() {
    this.dialogRef.close();
  }

  submitEvent() {
    if (this.formGroup.valid == false) {
      return;
    } // else
    this.disabled = true;

    let params: HttpParams = new HttpParams();
    params = params.append('email', this.formGroup.value['email']);

    this.httpService
      .postRequest(
        'forgot password',
        '/auth/password/forgot',
        this.formGroup.value,
        params
      )
      .then(() => {
        alert('Password reset was successful!');
        this.disabled = false;
        this.dialogRef.close();
      })
      .catch((error) => {
        alert('Error during reset:' + error.message);
        if (isDevMode()) {
          console.log('error:', error.message);
        }
        this.disabled = false;
      });
  }
}

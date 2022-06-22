import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordPopUpComponent> // private HttpService: BackendHttpService
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
    alert('submit event');
  }
}

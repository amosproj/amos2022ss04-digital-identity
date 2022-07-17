import { Component, Inject, isDevMode, OnInit, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { BackendHttpService } from '../../../services/backend-http-service/backend-http-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { MatSelect } from '@angular/material/select';
import { InformationPopUpComponent } from '../information-pop-up/information-pop-up.component';

@Component({
  selector: 'app-add-di-to-proof-template-pop-up',
  templateUrl: './add-di-to-proof-template-pop-up.component.html',
  styleUrls: ['./add-di-to-proof-template-pop-up.component.css'],
})
export class AddDIToProofTemplatePopUpComponent implements OnInit {
  public DIData: any[] = [];
  private cancelButtonString!: string;
  private id: string;
  public filteredSchemas: any;
  public selectedId: string = '';
  public attributesData: any = [];
  public alias: string;
  isSuccessData!: boolean;

  attributeFormGroup!: FormGroup;

  public DICtrl: FormControl = new FormControl();
  public DIFilterCtrl: FormControl = new FormControl();

  @ViewChild('singleSelect', { static: true }) singleSelect:
    | MatSelect
    | undefined;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDIToProofTemplatePopUpComponent>,
    public HttpService: BackendHttpService,
    public dialog_Ref: MatDialog,
    @Inject(MAT_DIALOG_DATA)
    private data: { id: string; alias: string }
  ) {
    if (isDevMode()) {
      this.cancelButtonString = 'Ney!';
      console.log('data.id:' + data.id);
      console.log('data.alias:' + data.alias);
    }
    this.id = data.id;
    this.alias = data.alias;

    this.attributeFormGroup = this.fb.group({
      connection: [null, Validators.required],
      attributes: [null],
    });
  }

  async ngOnInit() {
    this.getDI();
  }

  getDI() {
    const params = new HttpParams();
    this.HttpService.getRequest('Get all connection', '/connection/all', params)
      .then((response) => {
        if (response.ok) {
          this.DIData = response.body;
          console.log(this.DIData);
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  getSelectedDI(event: any) {
    this.selectedId = event.value;
    console.log(event);
    console.log(this.selectedId);
  }

  cancelButtonEvent() {
    this.dialogRef.close();
  }

  async save() {
    let params = new HttpParams();
    params = params.append('connectionId', this.selectedId);
    params = params.append('proofTemplateId', this.id);

    console.log('Dies ist der Log');

    await this.HttpService.postRequest(
      'Send a proof request to a connection.',
      '/presentation-proof/send',
      this.attributesData,
      params
    )
      .then((response) => {
        if (response.ok) {
          this.isSuccessData = true;
          this.dialog_Ref.open(InformationPopUpComponent, {
            data: {
              header: 'Success!',
              text: 'Succesfully send proof request to connection.',
              isSuccessData: this.isSuccessData
            },
          });
          this.dialogRef.close();
        } else {
          this.isSuccessData = false;
          this.dialog_Ref.open(InformationPopUpComponent, {
            data: {
              header: 'Process failed',
              text: 'Error ' + response.status + ' \n' + response.error,
              isSuccessData: this.isSuccessData
            },
          });
        }
      })
      .catch((response) => {
        console.log('error');
        console.log(response);
      });
  }

  isActive(DI: any): boolean {
    return DI.state == 'COMPLETED' || DI.state == 'RESPONDED'; //TODO: REQUESTED ?
  }
}

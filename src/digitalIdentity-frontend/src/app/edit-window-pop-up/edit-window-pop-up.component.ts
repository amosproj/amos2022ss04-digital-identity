import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog , MatDialogRef} from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

function dateRangeValidator(min: Date, max: Date): ValidatorFn {
  return control => {
    if (!control.value) return null;
    const dateValue = new Date(control.value);

    if (min && dateValue < min || max && dateValue > max) {
      return { message: 'date not in range' };
    }
    return null;
  }
}


@Component({
  selector: 'app-edit-window-pop-up',
  templateUrl: './edit-window-pop-up.component.html',
  styleUrls: ['./edit-window-pop-up.component.css']
})
export class EditWindowPopUpComponent implements OnInit {
  cancelButtonString: string = "Cancel"
  personal_information;
  formGroup: FormGroup;
  maxDate = new Date();
  minDate = new Date(1900,0,1);
  startDate = new Date(1990, 0, 1);
  id: string

  constructor(private http : HttpClient, private dialogRef: MatDialogRef<EditWindowPopUpComponent>,
              @Inject(MAT_DIALOG_DATA) private data:{id: string}) {
    if (isDevMode()) {
      this.cancelButtonString = "Ney!"
    }
    this.id = data.id
    console.log(this.id)
    var personalInfoJson = this.getPersonalInformation(this.id)
    // console.log("input PI: "+personalInfoJson.email)
    this.personal_information = this.initPersonalInformation(personalInfoJson)
    this.personal_information.forEach((pi)=> {
      // console.log(pi.key+" "+pi.value)
    })
    // console.log("update PI: "+this.personal_information)
    this.formGroup = this.initForm();
  }

  ngOnInit(): void {

  }

  cancel () {
    if (isDevMode()) console.log("Cancel => close window")
    this.dialogRef.close()
  }

  editButtonEvent () {
    let params:HttpParams = this.fetchPersonalInformation()
    this.updatePostRequest(params)
  }

  fetchPersonalInformation() : HttpParams {
    if (this.formGroup.valid) {
      let formGroup = this.formGroup;
      let params = new HttpParams();
      this.personal_information.forEach(function (pi, index: number) {
        if (pi.key == 'birthday') {
          let tempValue = new DatePipe('en').transform(formGroup.value[pi.key], 'dd/MM/yyyy'); //may be null
          if (tempValue != null) {
            params = params.append(pi.key, tempValue)
          }
        }
        else {
          params = params.append(pi.key, formGroup.value[pi.key])
        }
      })
      return params
    }
    return new HttpParams()
  }

  initPersonalInformation(personalInfoJson: {name:string, surname:string,email:string}) {
    return [
      {
        key: "name",
        label: "Name",
        required: true,
        value: personalInfoJson.name
      },
      {
        key: "surname",
        label: "Surname",
        required: true,
        value: personalInfoJson.surname
      },
      {
        key: "email",
        label: "Email",
        required: true,
        value: personalInfoJson.email
      }
    ];
  }

  initForm(): FormGroup {
    var formControls: { [id: string]: FormControl } = {}
    var minDate = this.minDate
    var maxDate = this.maxDate

    this.personal_information.forEach(function (pi) {
      if (pi.key == 'email'){
        formControls[pi.key] = new FormControl('', [Validators.email, Validators.required]);
      }
      else if (pi.key == 'birthday') {
        formControls[pi.key] = new FormControl('', [Validators.required, dateRangeValidator(minDate,maxDate)]);
      }
      else if (pi.required) {
        formControls[pi.key] = new FormControl('', Validators.required);
      }
      else {
        formControls[pi.key] = new FormControl('');
      }
      formControls[pi.key].setValue(pi.value)
    });

    return new FormGroup(formControls);
  }

  getPersonalInformation (id: string) {
    //TODO get the personal information to the connection from the backend
    var id_number:number  = Number(id)
    const header = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    const param = new HttpParams().append('id',id_number);
    var personal_inf = this.http.get<any>(environment.serverURL+'/connection/'+id,{headers:header,params:param});
    console.log(personal_inf)
    personal_inf.forEach((x) => console.log(x))
    return {
      name:"Bernd",
      surname:"Hofer",
      email:"test@test.de"
    }
  }

  updatePostRequest(params: HttpParams) {
    const headers = new HttpHeaders()
    .append(
      'Content-Type',
      'application/json'
    );
    let body = JSON.stringify(this.formGroup.value)
    return this.http.post<any>(environment.serverURL+'/auth/register', body, {headers:headers, params:params})
      .subscribe(
        (response) => {
          if(response == "success") {
            // TODO display success (e.g. as pop-up), redirect to registration-page
            console.log("Edit successful! Server response: " + response)
          } else {
            console.log("Edit not successful! Server response: " + response)
          }
        },
        (error) => console.log(error)
      )
  }

}

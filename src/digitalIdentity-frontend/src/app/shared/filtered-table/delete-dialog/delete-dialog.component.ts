import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendHttpService } from 'src/app/services/backend-http-service/backend-http-service.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  header: string = '';
  text: string = '';
  id: any = '';

  sure: boolean = false;

  deleteRequest: (arg0: any) => void = (arg0) => {};

  constructor(
    private httpService: BackendHttpService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: {
      header: string;
      text: string;
      id: any;
      deleteRequest: (arg0: any) => void;
    }
  ) {
    this.header = data.header;
    this.text = data.text;
    this.id = data.id;
    this.deleteRequest = data.deleteRequest;
  }

  ngOnInit(): void {}

  deleteEvent() {
    alert('delte id ' + this.id);
    this.deleteRequest(this.id);
    this.dialogRef.close();
  }
}

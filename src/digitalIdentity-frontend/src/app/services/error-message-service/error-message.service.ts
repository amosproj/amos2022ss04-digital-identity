import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformationPopUpComponent } from 'src/app/shared/pop-up/information-pop-up/information-pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  private dialogOpen = false;

  constructor(private matDialog: MatDialog) {}

  openHttpErrorDialog(error: HttpErrorResponse) {
    let data = {
      header: 'Process failed!',
      text: 'Error ' + error.status + ' \n' + error.error,
    };

    if (error.status == 401) {
      data = {
        header: 'Login session expired (401)',
        text: 'Please log in to your account',
      };
    }

    if (error.status >= 500) {
      data = {
        header: 'Internal Error (' + error.status + ')',
        text:
          "The server isn't configured correctly, is unavailable at the moment or a connected service doesn't work properly. This error message could help:\n\n\n" +
          error.message +
          '\n\n' +
          error.error,
      };
      if (typeof error.error === 'string' || error.error instanceof String) {
        if (error.error.length < 55) {
          data.header = String(error.error);
          data.text = '';
        }
      }

      if (data.text.includes('Error occurred while trying to proxy:')) {
        data.header = 'Backend is not reachable.';
        data.text =
          'Please contact your server administrator!\nIs the backend running? Is the backend reachable? Are the proxy settings correct?';
      }
    }

    if (error.status == undefined) {
      data = {
        header: 'Internal Error',
        text: "The server isn't configured correctly or is unavailable at the moment.",
      };
    }

    this.openDialog(data);
  }

  openCustomErrorDialog(text = ``, header = `Process failed!`) {
    this.openDialog({
      header: header,
      text: text,
    });
  }

  private openDialog(data: any) {
    if (this.dialogOpen) {
      console.log(
        'Another message should be displayed, but is rejected because another error message is still open. It will be displayed here: '
      );
      console.log(data);
      return;
    }

    this.dialogOpen = true;
    let errorPopUp = this.matDialog.open(InformationPopUpComponent, {
      data: data,
    });
    errorPopUp.afterClosed().subscribe(() => {
      this.dialogOpen = false;
    });
  }
}

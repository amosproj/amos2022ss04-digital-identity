import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';


@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {

  public data = new Subject<any>();

  constructor() { }

  public updateData(data: any) {
    this.data.next(data);
  }

}

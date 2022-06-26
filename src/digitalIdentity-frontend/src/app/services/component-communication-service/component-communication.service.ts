import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {
  map = new Map<string,any>();
  constructor() { }

  setData(key:string , value:any) {
    return this.map.set(key,value);
  }
  removeData(key:string) {
    return this.map.delete(key);
  }
  getData(key : string) {
    return this.map.get(key)
  }
}

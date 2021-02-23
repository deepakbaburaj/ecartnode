import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  constructor() { }
  showmsg()
  {
    return "Welcome";
  }
}

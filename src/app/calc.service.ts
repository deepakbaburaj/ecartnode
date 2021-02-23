import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalcService {
  userType = "none";
  counter = 0;
  count:BehaviorSubject<number>;

  constructor() {
    this.count = new BehaviorSubject(this.counter);
   }
   nextCount(){
    this.count.next(++this.counter);
   }
   itemAddedToCart(c = 12){
    this.count.next(c);
  }
}
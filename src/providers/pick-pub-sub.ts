import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import 'rxjs/add/operator/map';

/*
  Generated class for the PickPubSub provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PickPubSub {
public pickup$: Observable<any>;
public _observer: Observer<any>;

public EVENTS = {
  PICKUP: 'pickup',
  DROPOFF: 'dropoff',
  ARRIVAL_TIME: 'arrival-time'
};

  constructor() {
    this.pickup$ = new Observable(observer=>{
      this._observer = observer;
    })
    .share(); // share() allows multiple subscribers
  }
  watch(){
    return this.pickup$;
  }

  emitArrivalTime(time){
    this._observer.next({
      event: this.EVENTS.ARRIVAL_TIME,
      data: time
    })
  }
  emitPickUp(){
    this._observer.next({
      event: this.EVENTS.PICKUP,
      data:null
    })
  }
  emitDropOff(){
    this._observer.next({
      event: this.EVENTS.DROPOFF,
      data:null
    })
  }
}

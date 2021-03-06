import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SimulateService} from '../providers/simulate'
import 'rxjs/add/operator/map';

/*
  Generated class for the Car provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CarService {
  public simulate: SimulateService;

  constructor() {
    this.simulate= new SimulateService();
    console.log('Hello Car Provider');
  }

  pollForRiderPickup(){
    return this.simulate.riderPickedUp();
  }
  pollForRiderDropoff(){
    return this.simulate.riderDroppedOff();
  }
  dropoffCar(pickupLocation, dropoffLocation){
    return this.simulate.dropoffPickupCar(pickupLocation, dropoffLocation);
  }
  getPickupCar(){
    return this.simulate.getPickupCar();
  }
  findPickupCar(pickupLocation){
    return this.simulate.findPickupCar(pickupLocation);
  }
  getCars(lat, lng){
    return Observable
    .interval(2000)
    .switchMap(()=> this.simulate.getCars(lat, lng))
    .share();
  }

}

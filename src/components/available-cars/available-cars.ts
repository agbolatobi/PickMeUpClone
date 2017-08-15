import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {CarService} from '../../providers/car'
//import {SlidingMarker} = require('marker-animate-unobtrusive');
import * as SlidingMarker         from "marker-animate-unobtrusive";
/**
 * Generated class for the AvailableCars component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html',
  providers: []
})
export class AvailableCarsDirective implements OnInit {
@Input() map: google.maps.Map;
@Input() isPickupRequested: boolean;
  text: string;
  public carMarkers: Array<google.maps.Marker>;

  constructor(public carService: CarService) {
    console.log('Hello AvailableCars Component');
    this.carMarkers = [];
  }
  ngOnInit(){
this.fetchAndRefreshCars();
  }
 ngOnChanges(){
   if(this.isPickupRequested){
     this.removeCarMarkers();
   }
 }
 removeCarMarkers(){
   let numOfCars = this.carMarkers.length;
   console.log("removal")
   while(numOfCars--){
     
     let car = this.carMarkers.pop();
     car.setMap(null);
   }
 }
  addCarMarker(car){
    let carMarker = new SlidingMarker({
      map:this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car-icon.fw.png'
    })
    carMarker.setDuration(2000);
    carMarker.setEasing('linear');
carMarker.set('id',car.id); //MVObject()
this.carMarkers.push(carMarker)
  }
 updateCarMarker(car){
for(var i=0, numOfCars=this.carMarkers.length; i < numOfCars;
 i++){
//find car and update it
if ((<any>this.carMarkers[i]).id === (<any>car).id){
this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
return;
}
  
}

//car does not exist in carMarkers
this.addCarMarker(car);
  }
  fetchAndRefreshCars(){
this.carService.getCars(9,9)
  .subscribe(carsData =>{
    if(!this.isPickupRequested){
      (<any>carsData).cars.forEach(
        car=>{
          this.updateCarMarker(car);
        }
      )
    }
  })
}
  

}

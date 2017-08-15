import { Component, Input, Output,EventEmitter, OnChanges, OnInit } from '@angular/core';
import {Geolocation} from 'ionic-native';
import {} from '@types/googlemaps';
import {CarService} from '../../providers/car'
import {PickPubSub} from "../../providers/pick-pub-sub";
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the Pickup component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
declare var google: any;
@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html',
  providers:[]
})
export class PickupDirective implements OnInit, OnChanges {
  //MySubclass= new google.maps.MVCObject();
@Input() isPinSet: boolean;
@Input() map: google.maps.Map;
@Input() isPickupRequested: boolean;
@Input() destination: string;
@Output() updatedPickupLocation: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
private pickupMarker: google.maps.Marker;
private popup : google.maps.InfoWindow;
private pickSubscription:any;
  

  constructor(private pickupPubSub: PickPubSub) {
    console.log('Hello Pickup Component');
  }
ngOnInit(){
this.pickSubscription=this.pickupPubSub.watch().subscribe(e=>{
  if(e.event === this.pickupPubSub.EVENTS.ARRIVAL_TIME){
    this.updateTime(e.data);
  }
})  
}
 ngOnChanges(changes){
   console.log(changes);
   //do not allow pickup pin/location
   //to change if pickup is requested
  if(this.isPinSet){
    console.log('SHOW pickup marker')
    this.showPickupMarker();
  }else{
    console.log('REMOVE pickup marker')
    this.removePickupMarker();
  }
  if(this.destination){
    this.removePickupMarker();
  }
}

showPickupMarker(){
  this.removePickupMarker();
  this.pickupMarker= new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.BOUNCE,
    position:this.map.getCenter(),
    icon: 'img/person-icon.fw.png'

  })
  setTimeout(() =>{
    //this.pickupMarker.setAnimation(null);
},750)
this.showPickupTime();

//send pickup location
this.updatedPickupLocation.next(this.pickupMarker.getPosition());
}
removePickupMarker(){
 if(this.pickupMarker){
      this.pickupMarker.setMap(null);
      this.pickupMarker = null;
    }
}
showPickupTime(){
  this.popup = new google.maps.InfoWindow({
    content:'<h5>You Are Here</h5>'
  });
  this.popup.open(this.map, this.pickupMarker);
  google.maps.event.addListener(this.pickupMarker, 'click', ()=>{
    this.popup.open(this.map, this.pickupMarker)
  });
}
updateTime(seconds){
  let minutes = Math.floor(seconds/60);
  this.popup.setContent(`<h5>${minutes} minutes</h5>`)
}
}


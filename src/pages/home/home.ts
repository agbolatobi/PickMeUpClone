import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {MapDirective} from '../../components/map/map'
import {PickPubSub} from "../../providers/pick-pub-sub";
import { DestinationAddressDirective } from '../../components/destination-address/destination-address';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[PickPubSub]

})

export class HomePage {
public isPickupRequested: boolean;
public isRiderPickedUp: boolean;
public pickupSubscription: any;
public timeTillArrivalTime: number;
public destination: string;
  constructor(public navCtrl: NavController,
   private alertCtrl: AlertController,
   private pickupPubSub: PickPubSub) {
this.isPickupRequested=false;
this.isRiderPickedUp = false;
this.timeTillArrivalTime=5;
this.pickupSubscription = this.pickupPubSub.watch().subscribe(e=>{
  this.processPickupSubscription(e);
})
  }
  processPickupSubscription(e){
    switch(e.event){
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
      this.updateTime(e.data);
      break;
      case this.pickupPubSub.EVENTS.PICKUP:
      this.riderPickedUp();
      break;
      case this.pickupPubSub.EVENTS.DROPOFF:
      this.riderDroppedOff();
      break;
    }
  }
  setDestination(destination){
this.destination = destination
  }
  riderPickedUp(){
    this.isRiderPickedUp = true;
  }
  rateDriver(){
let prompt = this.alertCtrl.create({
  title:'Rate Driver',
  message:'Select a rating for your driver',
  inputs: [{
    type: 'radio',
    label: 'Perfect',
    value: 'perfect',
    checked: true
  },{
    type: 'radio',
    label: 'Okay',
    value: 'okay',
  },{
    type: 'radio',
    label: 'Horrible',
    value: 'horrible',
  }],
  buttons:[{
    text: 'Submit',
    handler: rating =>{
      //TODO: send rating to server
      console.log(rating)
    }
  }]
});
prompt.present();
  }
  riderDroppedOff(){
    this.rateDriver();
    this.isRiderPickedUp = false;
    this.isPickupRequested=false;
    this.destination=null;
    this.timeTillArrivalTime = 5;
  }
  confirmPickup(){
    this.isPickupRequested=true;
  }
cancelPickup(){
  this.isPickupRequested=false;
}
updateTime(seconds){
  let minutes = Math.floor(seconds/60);
  this.timeTillArrivalTime = minutes;
}
}

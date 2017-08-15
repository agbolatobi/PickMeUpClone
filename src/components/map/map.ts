import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import {LoadingController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import {PickupDirective} from '../pickup/pickup';
import {AvailableCarsDirective} from '../available-cars/available-cars';
import {CarService} from '../../providers/car'
import {PickupCarDirective} from '../pickup-car/pickup-car'
//import {Observable} from 'rxjs/Rx';
//import {} from 'rxjs/add/observable/fromPromise';
/**
 * Generated class for the Map component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
declare var google: any;
@Component({
  selector: 'map',
  templateUrl: 'map.html',
  providers:[CarService]
})
export class MapDirective {
  @Input() isPickupRequested: boolean;
  @Input() destination: string;
  
public map: google.maps.Map;
public isMapIdle:boolean;
public currentLocation: google.maps.LatLng;
  text: string;
  constructor(public loadingCtrl: LoadingController, public geolocation: Geolocation) {
    
    console.log('Hello Map Component');
    this.text = 'Hello World';
  }
  ngOnInit(){
this.map = this.createMap();
this.addMapEventListeners();
  }
  ngAfterViewInit() {
   this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }
  updatePickupLocation(location){
    this.currentLocation = location;
    this.centerLocation(location);
  }
    addMapEventListeners(){
    google.maps.event.addListener(this.map,'dragstart',()=>{
      this.isMapIdle = false;

    })
      google.maps.event.addListener(this.map,'idle',()=>{
        this.isMapIdle = true;
    }) 
  }
getCurrentLocation(): Observable<any> {
    
    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });
    
    loading.present(loading);
    
    let options = {timeout: 10000, enableHighAccuracy: true};
    
    let locationObs = Observable.create(observable => {
      
      Geolocation.getCurrentPosition(options)
        .then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          
          let location = new google.maps.LatLng(lat, lng);
          
          console.log('Geolocation: ' + location);
          
          observable.next(location);
          
          loading.dismiss();
        },
        (err) => {
          console.log('Geolocation err: ' + err);
          loading.dismiss();
        })

    })
    
    return locationObs;
  }
  createMap(location= new google.maps.LatLng(40.760719, -73.987664)){
let mapOptions = {
  center: location,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  disableDefaultUI:true

}
let mapEL = document.getElementById('map');
 return new google.maps.Map(mapEL, mapOptions)
  }
  centerLocation(location) {
    
    if (location) {
     // this.currentlocation=location;
      this.map.panTo(location);
      
    }
    else {
      
      this.getCurrentLocation().subscribe(currentLocation => {
        //this.currentlocation=currentLocation;
        this.map.panTo(currentLocation);
      });
    }
  }

}

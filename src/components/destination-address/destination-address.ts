import { Component,Output ,EventEmitter } from '@angular/core';

/**
 * Generated class for the DestinationAddress component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'destination-address',
  templateUrl: 'destination-address.html'
})
export class DestinationAddressDirective {
@Output() newDest: EventEmitter<string> = new EventEmitter<string>();
  public enteredAddress: string;
  public geocoder: google.maps.Geocoder;
  public results: Array<any>;

  constructor() {
    this.enteredAddress="";
    this.geocoder = new google.maps.Geocoder();
    this.results = [];
  }
 onSubmit(){
   //alert("In");
 this.geocoder.geocode({ address: this.enteredAddress},
 (destinations, status)=>{
   if(status === google.maps.GeocoderStatus.OK){
     this.results = destinations.slice(0,4) // show top 4 results
    }
    else if (status == google.maps.GeocoderStatus.ZERO_RESULTS){
      alert("Destination not Found")
    }
 });
}
selectDestination(destination){
this.results = [];
this.enteredAddress=destination.formattted_address;
//pass the destination lat/lng to the parent
this.newDest.next(destination.geometry.location);
}
}

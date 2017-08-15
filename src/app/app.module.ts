import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from 'ionic-native';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {MapDirective} from '../components/map/map'
import {PickupDirective} from '../components/pickup/pickup';
import {AvailableCarsDirective} from '../components/available-cars/available-cars';

import {SimulateService} from '../providers/simulate';
import {CarService} from '../providers/car';
import {PickupCarDirective} from '../components/pickup-car/pickup-car';
import { DestinationAddressDirective } from '../components/destination-address/destination-address';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapDirective,
    PickupDirective,
    AvailableCarsDirective,
    PickupCarDirective,
    DestinationAddressDirective
  ],
  imports: [
    BrowserModule,
    
    IonicModule.forRoot(MyApp)
  ]//,schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  ,bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    SimulateService,
    CarService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

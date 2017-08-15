import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DestinationAddressDirective } from './destination-address';

@NgModule({
  declarations: [
    DestinationAddressDirective,
  ],
  imports: [
    IonicPageModule.forChild(DestinationAddressDirective),
  ],
  exports: [
    DestinationAddressDirective
  ]
})
export class DestinationAddressModule {}

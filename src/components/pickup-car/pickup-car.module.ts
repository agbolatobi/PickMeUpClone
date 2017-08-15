import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupCarDirective } from './pickup-car';

@NgModule({
  declarations: [
    PickupCarDirective,
  ],
  imports: [
    IonicPageModule.forChild(PickupCarDirective),
  ],
  exports: [
    PickupCarDirective
  ]
})
export class PickupCarModule {}

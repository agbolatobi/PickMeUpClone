import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PickupDirective } from './pickup';

@NgModule({
  declarations: [
    PickupDirective ,
  ],
  imports: [
    IonicPageModule.forChild(PickupDirective ),
  ],
  exports: [
    PickupDirective 
  ]
})
export class PickupModule {}

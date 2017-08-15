import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailableCarsDirective } from './available-cars';

@NgModule({
  declarations: [
    AvailableCarsDirective,
  ],
  imports: [
    IonicPageModule.forChild(AvailableCarsDirective),
  ],
  exports: [
    AvailableCarsDirective
  ]
})
export class AvailableCarsModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WittrMessageModalPage } from './wittr-message-modal';

@NgModule({
  declarations: [
    WittrMessageModalPage,
  ],
  imports: [
    IonicPageModule.forChild(WittrMessageModalPage),
  ],
})
export class WittrMessageModalPageModule {}

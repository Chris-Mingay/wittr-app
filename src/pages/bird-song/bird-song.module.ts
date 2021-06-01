import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BirdSongPage } from './bird-song';

@NgModule({
  declarations: [
    BirdSongPage,
  ],
  imports: [
    IonicPageModule.forChild(BirdSongPage),
  ],
})
export class BirdSongPageModule {}

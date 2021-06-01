import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PodcastPage } from './podcast';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    PodcastPage,
  ],
  imports: [
    IonicPageModule.forChild(PodcastPage),
      PipesModule
  ],
})
export class PodcastPageModule {}

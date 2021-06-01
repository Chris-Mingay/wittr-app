import { NgModule } from '@angular/core';
import { PodcastTimePipe } from './podcast-time/podcast-time';
@NgModule({
	declarations: [PodcastTimePipe],
	imports: [],
	exports: [PodcastTimePipe]
})
export class PipesModule {}

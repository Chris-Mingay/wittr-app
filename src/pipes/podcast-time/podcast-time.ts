import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the PodcastTimePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
    name: 'podcastTime',
})
export class PodcastTimePipe implements PipeTransform {
    transform(d: number, args: any[]) {

        if (typeof d == 'undefined') {
            return '--';
        }

        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
    }
}

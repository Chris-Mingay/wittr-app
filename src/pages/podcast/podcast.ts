import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {WittrApiProvider} from "../../providers/wittr-api/wittr-api";

/**
 * Generated class for the PodcastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-podcast',
    templateUrl: 'podcast.html',
})
export class PodcastPage {

    public podcastData: any;
    public podcastDataReady: boolean;
    public audio: any;

    constructor(private navCtrl: NavController, private wittrApi: WittrApiProvider, private loadingCtrl: LoadingController) {

    }

    ionViewDidLoad() {

        setTimeout(() => {
            this.refreshLocal();
        }, 500);

    }

    refresh(e: any) {
        let loading = this.loadingCtrl.create();

        loading.present();

        this.wittrApi.getPodcastData(true)
            .then(data => {

                this.podcastData = data;
                loading.dismiss();
                this.podcastDataReady = true;

            });

        e.complete();
    }

    refreshLocal() {
        let loading = this.loadingCtrl.create();

        loading.present();

        this.wittrApi.getPodcastData(true)
            .then(data => {

                this.podcastData = data;
                loading.dismiss();
                this.podcastDataReady = true;

            });

    }


    play(item) {

        if (this.wittrApi.audio != null) {
            this.wittrApi.audio.stop();
        }
        this.wittrApi.audio = new Audio();
        this.wittrApi.audio.src = item.mp3;
        this.wittrApi.audio.load();
        this.wittrApi.resume();
        this.wittrApi.playingItem = item;
        this.wittrApi.playing = true;
    }

}

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {WittrApiProvider} from "../../providers/wittr-api/wittr-api";

/**
 * Generated class for the BirdSongPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bird-song',
    templateUrl: 'bird-song.html',
})
export class BirdSongPage {



    constructor(public navCtrl: NavController, public navParams: NavParams, public wittrApi:WittrApiProvider, public platform:Platform) {


    }

    ionViewDidLoad() {

        console.log('ionViewDidLoad BirdSongPage');
    }

    toggleBirdSong(){
        this.wittrApi.toggleBirdSong();
    }


}

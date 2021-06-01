import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the CodeOfConductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-code-of-conduct',
    templateUrl: 'code-of-conduct.html',
})
export class CodeOfConductPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CodeOfConductPage');
    }

    openPDF() {
        window.open(encodeURI('http://www.bbc.co.uk/5live/films/code_of_conduct.pdf'), '_system');
    };

}

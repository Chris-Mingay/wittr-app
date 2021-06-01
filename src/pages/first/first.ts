import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WittrSettingsProvider} from "../../providers/wittr-settings/wittr-settings";
import {WelcomePage} from "../welcome/welcome";
import {MapPage} from "../map/map";

/**
 * Generated class for the FirstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-first',
  templateUrl: 'first.html',
})
export class FirstPage {

    constructor(private navCtrl: NavController, private wittrSettings:WittrSettingsProvider) {
        setTimeout(()=>{
            if(this.wittrSettings.welcomeSeen){
                this.navCtrl.setRoot(MapPage)
            }else{
                this.navCtrl.setRoot(WelcomePage)
            }
        },500);
    }

}

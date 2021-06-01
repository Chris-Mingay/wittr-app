import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WittrSettingsProvider} from "../../providers/wittr-settings/wittr-settings";
import {MapPage} from "../map/map";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

    constructor(private navCtrl: NavController, public wittrSettings:WittrSettingsProvider) {

    }

    gotoMap() {

        this.wittrSettings.welcomeSeen = true;
        this.wittrSettings.Save();
        //push another page onto the history stack
        //causing the nav controller to animate the new page in
        //this.navCtrl.push(MapPage);
        this.navCtrl.setRoot(MapPage);
    }

}

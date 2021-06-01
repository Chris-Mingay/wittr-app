import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WittrApiProvider} from "../../providers/wittr-api/wittr-api";

/**
 * Generated class for the DemographicsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-demographics',
  templateUrl: 'demographics.html',
})
export class DemographicsPage {

    public demographics:any;
    public split:any;
    public itemsPerRow:number = 3;

    constructor(private navCtrl: NavController, private wittrApi:WittrApiProvider) {
        this.wittrApi.getDemographics().then(demographics=>{
            this.demographics = demographics;
        })
    }

    toggleItem(event,item){
        this.wittrApi.setDemographic(item.fieldName,item.checked);
    }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WittrApiProvider} from "../../providers/wittr-api/wittr-api";

/**
 * Generated class for the FundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fund',
  templateUrl: 'fund.html',
})
export class FundPage {

    public imgSrc:string = "assets/imgs/wittcoin.png";
    public imgSrcOff:string = "assets/imgs/wittcoin.png";
    public imgSrcOn:string = "assets/imgs/wittcoin-hit.png";

    public playSound:any;
    public funding:any = 0;

    constructor(private navCtrl: NavController, private wittrApi:WittrApiProvider) {
        this.wittrApi.getFunding().then(data=> {
            this.funding = parseInt(data.toString());
        });

    }

    goFund(){
        this.wittrApi.fund().then(data=>{
            this.funding = parseInt(data.toString());
        });

        this.imgSrc = this.imgSrcOn;

        /*this.playSound = new Audio();
        this.playSound.src = "sfx/WittCoin.wav";
        this.playSound.load();
        this.playSound.play();*/

        setTimeout(()=>{
            this.imgSrc = this.imgSrcOff;
        },50)
    }

}

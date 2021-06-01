import {Component, ElementRef, ViewChild} from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    IonicPage,
    ModalController,
    NavController,
    NavParams, ToastController
} from 'ionic-angular';
import {WittrMessageModalPage} from "../wittr-message-modal/wittr-message-modal";
import {WittrApiProvider} from "../../providers/wittr-api/wittr-api";
import {removeView} from "@angular/core/src/render3/node_manipulation";

declare var google;
declare var MarkerClusterer;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

    @ViewChild('map') mapElement: ElementRef;

    constructor(public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, private wittrApi:WittrApiProvider,private alertCtrl:AlertController, private modalCtrl:ModalController, private toastCtrl:ToastController) {

    }

    ionViewDidLoad(){
        setTimeout(()=>{
            this.wittrApi.loadMap(this.mapElement);
        },500);

    }

    focusOnMe()
    {
        this.wittrApi.focusOnMe();
    }


    presentActionSheet() {

        let actionSheet = this.actionSheetCtrl.create({
            title: 'How can I help?',
            buttons: [
                {
                    text: 'Focus on me',
                    handler: () => {
                        this.focusOnMe();
                    }
                },
                {
                    text: 'Set my message',
                    handler: () => {
                        actionSheet.dismiss().then(()=>{
                            this.showMessageModal();
                        });
                        return false;
                    }
                },
                {
                    text: 'Clear the map',
                    role: 'destructive',
                    cssClass: 'danger',
                    handler: () => {
                        actionSheet.dismiss().then(() => {
                            this.showClearConfirm()
                        });
                        return false;
                    }
                },{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {

                    }
                }
            ]
        });

        actionSheet.present();
    }

    showClearConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Clear the map?',
            message: 'This clears all the Wittees from the map (don\'t worry, you can get them back)',
            buttons: [
                {
                    text: 'No thanks',
                    role: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Yes please',
                    handler: () => {
                        this.wittrApi.clearMap();
                    }
                }
            ]
        });
        confirm.present();
    }

    showMessageModal() {

        let modal = this.modalCtrl.create(WittrMessageModalPage,{message: this.wittrApi.message});
        modal.onDidDismiss(data=>{

            console.log(data);
            if(data==true){
                let toast = this.toastCtrl.create({
                    message: "Message updated successfully",
                    duration: 1500
                });
                toast.present();
            }

        });
        modal.present().then( ()=> {
        });

    }

}

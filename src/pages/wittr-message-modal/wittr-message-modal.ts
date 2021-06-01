import {Component} from '@angular/core';
import {
    IonicPage,
    Keyboard,
    LoadingController,
    NavController,
    NavParams,
    ToastController,
    ViewController
} from 'ionic-angular';
import {WittrApiProvider} from "../../providers/wittr-api/wittr-api";
import {removeView} from "@angular/core/src/render3/node_manipulation";

/**
 * Generated class for the WittrMessageModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-wittr-message-modal',
    templateUrl: 'wittr-message-modal.html',
})
export class WittrMessageModalPage {

    constructor(private params: NavParams, private navCtrl: NavController, public viewCtrl: ViewController, private wittrApi: WittrApiProvider, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private keyboard:Keyboard) {
        this.message = params.get('message');
    }

    public characterLimit: number = 140;
    public characterCount: number = 0;
    public lengthOK: boolean = true;
    public message: string = "H.T.J.I.";
    public goodSend: boolean = false;

    updateCharacterCount(text) {
        this.goodSend = false;
        this.characterCount = text.value.length;
        this.lengthOK = (this.characterCount <= this.characterLimit)
    }

    dismiss() {
        this.viewCtrl.dismiss(this.goodSend);
    }

    updateMessage() {

        let loading = this.loadingCtrl.create();

        loading.present();

        this.wittrApi.setMessage(this.message)
            .then(data => {

                loading.dismiss().then(() => {
                    if (data == true) {
                        this.keyboard.close();
                        this.goodSend = true;

                        this.dismiss();


                    } else {
                        setTimeout(() => {
                            let toast = this.toastCtrl.create({
                                message: "Problem setting message",
                                duration: 1500
                            });
                            toast.present();
                        }, 250);
                    }
                });


            }, (err) => {
                loading.dismiss();
            });
    }

}

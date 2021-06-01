import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {WittrApiProvider} from "../wittr-api/wittr-api";
import { Storage } from '@ionic/storage';

/*
  Generated class for the WittrSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WittrSettingsProvider {

    private storageUrl: string = "settingsData";

    canSubmit: boolean = true;
    submitIntervalInMinutes: number = 30;
    fuzzDistance: string = "0.1";
    battenburg: boolean = false;
    welcomeSeen: boolean = false;

    constructor(private wittrApi: WittrApiProvider, private storage: Storage) {
        this.LoadFromLocalStorage();
    }

    SetCanSubmit(inputVal: any) {

        this.canSubmit = inputVal;
        this.SaveCanSubmit();
    }

    SaveCanSubmit() {

        this.wittrApi.canSubmit = this.canSubmit;
        this.Save();
    }

    SaveBattenburg() {

        this.wittrApi.UpdateMyMarker(this.battenburg);
        this.wittrApi.setBattenburg(this.battenburg);
        this.Save();
    }

    SaveFuzzDistance() {
        this.wittrApi.setFuzzDistance(parseFloat(this.fuzzDistance));
        this.Save();
    }

    Save() {
        this.SaveToLocalStorage();
    }

    SaveToLocalStorage() {
        let output = {
            canSubmit: this.canSubmit,
            submitIntervalInMinutes: this.submitIntervalInMinutes,
            fuzzDistance: this.fuzzDistance,
            battenburg: this.battenburg,
            welcomeSeen: this.welcomeSeen
        };
        this.storage.set(this.storageUrl, JSON.stringify(output));
    }

    LoadFromLocalStorage() {
        this.storage.get(this.storageUrl).then((val) => {


            if (val != null) {
                let dataAsJson = JSON.parse(val);
                this.canSubmit = dataAsJson.canSubmit;
                this.submitIntervalInMinutes = dataAsJson.submitIntervalInMinutes;
                this.fuzzDistance = dataAsJson.fuzzDistance;
                this.battenburg = dataAsJson.battenburg;
                this.welcomeSeen = dataAsJson.welcomeSeen || false;

                this.wittrApi.battenburg = this.battenburg;
                this.wittrApi.setFuzzDistance(parseFloat(this.fuzzDistance));
                this.wittrApi.canSubmit = this.canSubmit;

            }

            this.wittrApi.UpdateMyMarker(this.battenburg);

        }).catch((empty) => {

        });
    }

}

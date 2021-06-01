import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ElementRef, Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage'
import {Diagnostic} from "@ionic-native/diagnostic";


declare var google;
declare var MarkerClusterer;

/*
  Generated class for the WittrApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WittrApiProvider {

    //public apiBase:string = "http://wittr.local";
    public apiBase:string = "https://wittr.ct14hosted.co.uk/api";
    public apiVersion:string = "av5";

    genApi(input:string)
    {
        return this.apiBase + '/' + this.apiVersion + '/' + input;
    };

    attempts: number;
    mapLoaded: boolean;
    map: any;
    markerCluster: any;
    markers: any;
    markerHashes: any;
    mapElement: ElementRef;
    me: any;
    myLatLng: any;
    something: string = "Something";
    apiKey:string;
    getWitteesTimeout:any;
    apiReady:boolean = false;
    podcastData:any;
    podcastDataReady:boolean;
    battenburg:boolean;
    message:string = "H.T.J.I.";

    position:any = {
        lat:51.5074,
        lng:0.1278
    };
    infoWindow:any;

    fuzzDistance:number;
    canSubmit:boolean = true;


    constructor(private http:HttpClient,private loadingCtrl: LoadingController, private storage:Storage, private geolocation: Geolocation, public toastCtrl:ToastController, private diagnostic:Diagnostic, private alertCtrl:AlertController) {

        this.mapLoaded = false;
        this.markers = {};
        this.markerHashes = [];
        this.attempts =0;
        this.getWitteesTimeout = null;

        this.storage.get('apiKey').then((val) => {
            this.apiKey = val;
            this.getApiKey();
        }).catch((empty) => {
            this.apiKey = '';
            this.getApiKey();
        });

        this.storage.get('message').then((val) => {
            if (val != null) {
                this.message = val;
            }
        });

        this.storage.get('position').then((val) => {
            if (val != null) {
                this.position = JSON.parse(val);
            }
        });

        this.storage.get('podcastData').then((val) => {
            if(val != null)
            {
                this.podcastData = JSON.parse(val);
                this.podcastDataReady = true;
            }else{
                this.podcastDataReady = false;
            }
        }).catch((empty) => {
            this.podcastDataReady = false;
        });




    }

    loadMap(mapElement: ElementRef)
    {

        let that = this;

        this.mapElement = mapElement;
        this.myLatLng = new google.maps.LatLng(this.position.lat, this.position.lng);
        let mapOptions = {
            center: this.myLatLng,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: true,
            fullscreenControl: false
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


        this.map.addListener('center_changed', function() {

            clearTimeout(this.getWitteesTimeout);
            this.getWitteesTimeout = setTimeout(() => {
                var pos = that.map.getCenter();
                that.getMarkers(pos.lat(),pos.lng());
            }, 500);
        });

        google.maps.event.addListenerOnce(that.map, 'bounds_changed', function(){

            that.getPosition().then((position:any)=>{
                that.map.setCenter(that.myLatLng);
            });


            var clusterStyles = [
                {
                    textColor: 'white',
                    url: 'assets/imgs/m1.png',
                    height: 50,
                    width: 50
                },
                {
                    textColor: 'white',
                    url: 'assets/imgs/m2.png',
                    height: 50,
                    width: 50
                },
                {
                    textColor: 'white',
                    url: 'assets/imgs/m3.png',
                    height: 50,
                    width: 50
                },
                {
                    textColor: 'white',
                    url: 'assets/imgs/m4.png',
                    height: 50,
                    width: 50
                },
                {
                    textColor: 'white',
                    url: 'assets/imgs/m5.png',
                    height: 50,
                    width: 50
                }
            ];

            var markersAsArray = [];
            for (var property in that.markers) {
                markersAsArray.push(that.markers[property]);
            }

            that.markerCluster = new MarkerClusterer(that.map, markersAsArray, {
                styles:clusterStyles,
                maxZoom: 13
                /*gridSize: 10,*/
            });

            var image = {
                url: 'assets/imgs/me'+(that.battenburg ? '-battenburg' : '')+'.png',
                size: new google.maps.Size(120, 144),
                scaledSize: new google.maps.Size(45, 54),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(22, 54)
            };



            that.infoWindow = new google.maps.InfoWindow({
                content: "H.T.J.I",
                pixelOffset: new google.maps.Size(-20, -5)
            });

            that.me = new google.maps.Marker({
                map: that.map,
                position: that.myLatLng,
                icon: image
            });

            that.me.hash = "me";

            that.addInfoWindow(that.me,that.message);


            that.getMarkers(that.myLatLng.lat(),that.myLatLng.lng());

            //that.updatePosition(position);
            that.mapLoaded = true;


        });
    }

    UpdateMyMarker(iAmBattenburg:boolean)
    {
        this.battenburg = iAmBattenburg
        var image = {
            url: 'assets/imgs/me'+(iAmBattenburg ? '-battenburg' : '')+'.png',
            size: new google.maps.Size(120, 144),
            scaledSize: new google.maps.Size(45, 54),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(22, 54)
        };

        this.me.setIcon(image);
    }

    getPosition()
    {

        return new Promise((resolve, reject) => {

            this.geolocation.getCurrentPosition().then((position:any) => {

                this.position.lat = position.coords.latitude;
                this.position.lng = position.coords.longitude;
                this.storage.set('position', JSON.stringify(this.position));
                this.updatePosition(position);
                this.myLatLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                this.me.setPosition(this.myLatLng);

                resolve(position);

            }, (err) => {
                reject(err);
            });
        });
    }

    focusOnMe()
    {

        this.diagnostic.isLocationAuthorized().then(state => {
            if (!state) {
                let confirm = this.alertCtrl.create({
                    title: '<b>Location</b>',
                    message: 'Location information is unavaliable on this device. Go to Settings to enable Location.',
                    buttons: [
                        {
                            text: 'cancel',
                            role: 'Cancel',
                            handler: () => {

                            }
                        },
                        {
                            text: 'Go to settings',
                            handler: () => {
                                this.diagnostic.switchToSettings()
                            }
                        }
                    ]
                });
                confirm.present();
            }
            else
            {
                let loading = this.loadingCtrl.create();
                loading.present();
                this.getPosition().then((d:any) => {
                    this.map.setCenter(this.myLatLng);
                    loading.dismiss();
                }, (err) => {
                    loading.dismiss();
                    let toast = this.toastCtrl.create({
                        message: "Could not get position",
                        duration: 3000,
                        position: 'top'
                    });
                    toast.present();
                });
            }
        });

    }

    removeMarker(hash)
    {

        if(typeof this.markers[hash] == 'undefined')
        {
            return;
        }
        var marker = this.markers[hash];
        this.markerCluster.removeMarker(marker);
        marker.setMap(null);
        this.markers[hash] = null;
        delete(this.markers[hash]);

        this.RemoveFromArray(this.markerHashes,hash);

    }


    RemoveFromArray(arr:any[],key:any)
    {
        var index = arr.indexOf(key, 0);
        if (index > -1) {
            arr.splice(index, 1);
        }
    }

    clearMap()
    {
        for (var property in this.markers) {
            this.removeMarker(property);
        }
        // this.markerHashes = [];
    }

    addMarker(lat:number,lng:number,hash:string,bb:boolean,message:string)
    {

        if(this.markerHashes.indexOf(hash) >= 0)
        //if(typeof this.markers[hash] !='undefined')
        {
            var existingMarker = this.markers[hash];
            existingMarker.setPosition(new google.maps.LatLng(lat,lng));
            return;
        }

        var image = {
            url: 'assets/imgs/marker' + (bb ? '-battenburg' : '')+'.png',
            size: new google.maps.Size(60, 72),
            scaledSize: new google.maps.Size(30, 36),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(15, 36)
        };

        let marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(lat,lng),
            icon: image
        });

        this.addInfoWindow(marker,message);

        marker.hash = hash;
        this.markers[hash] = marker;
        this.markerHashes.push(hash);

        this.markerCluster.addMarker(marker);

    }



    getMarkers(lat:number,lng:number)
    {

        let data = {
            "latitude":lat,
            "longitude":lng,
            "uuid":this.apiKey
        };
        let body = JSON.stringify(data);
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.http.post(this.genApi('wittees'),body,{headers:headers})
            .subscribe((data:any) => {

                if(typeof data.id != 'undefined' && data.id != '')
                {
                    this.apiKey = data.id;
                    this.storage.set("apiKey",this.apiKey);
                }

                /**
                 * @param {{wittees:Array}} data
                 */
                for (var i = 0, len = data.wittees.length; i < len; i++) {
                    this.addFromApi(data.wittees[i]);
                }

                this.me.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

            });

    }

    addFromApi(wittee){
        this.addMarker(wittee.latitude,wittee.longitude,wittee.hash,wittee.bb,wittee.message);
    }

    getApiKey()
    {
        this.http.get(this.genApi('id/') + this.apiKey)
            .subscribe((data:any) => {
                this.apiKey = data.id;
                this.storage.set("apiKey",this.apiKey);
                this.apiReady = true;
            });
    }

    // PODCAST STUFF

    getPodcastData(force:boolean = false)
    {

        if (this.podcastDataReady && force == false) {
            return Promise.resolve(this.podcastData);
        }

        // don't have the data yet
        return new Promise(resolve => {
            // We're using Angular HTTP provider to request the data,
            // then on the response, it'll map the JSON data to a parsed JS object.
            // Next, we process the data and resolve the promise with the new data.
            this.http.get(this.genApi('podcast'))
                .subscribe((data) => {
                    // we've got back the raw data, now generate the core schedule data
                    // and save the data for later reference
                    this.podcastDataReady = true;
                    this.podcastData = data;
                    //this.localStorage.set("podcastData",JSON.stringify(data));
                    resolve(this.podcastData);
                });
        });
    }

    setFuzzDistance(nD:number)
    {
        this.fuzzDistance = nD;
    }


    setBattenburg(isBat:boolean){

        this.battenburg = isBat;
        //this.localStorage.set('message',this.message);

        let body = JSON.stringify({battenburg: this.battenburg, uuid: this.apiKey});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        return new Promise(resolve => {
            this.http.post(this.genApi('battenburg'), body, options)
                .subscribe((data:any) => {

                    if (typeof data.id != 'undefined' && data.id != '') {
                        this.apiKey = data.id;
                    }

                    if (typeof data.success) {
                        /**
                         * @param {{funding:number}} data
                         */
                        resolve(data.funding);
                    }else{
                        resolve(0);
                    }

                });
        });

    }

    // FUNDING STUFF

    fund()
    {

        return new Promise(resolve => {
            let data = {
                "uuid":this.apiKey
            };
            let body = JSON.stringify(data);
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            let options = { headers: headers };

            this.http.post(this.genApi('fund'),body,options)
                .subscribe((data:any) => {

                    if (typeof data.success != 'undefined') {
                        /**
                         * @param {{funding:number}} data
                         */
                        resolve(data.funding);
                    }else{
                        resolve(0);
                    }
                });
        });


    }

    getFunding(){

        return new Promise(resolve => {
            this.http.get(this.genApi('funding'))
                .subscribe((data:any) => {

                    if (typeof data.success != 'undefined') {
                        /**
                         * @param {{funding:number}} data
                         */
                        resolve(data.funding);
                    }else{
                        resolve(0);
                    }
                });
        });

    }

    // DEMOGRAPHIC STUFF

    public demographics:any;

    getDemographics(){
        let body = JSON.stringify({uuid: this.apiKey});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        return new Promise(resolve => {
            this.http.post(this.genApi('demographics'), body, options)
                .subscribe((data:any) => {

                    if (typeof data.id != 'undefined' && data.id != '') {
                        this.apiKey = data.id;
                    }

                    if (typeof data.success) {

                        this.demographics = data.demographics;

                        /**
                         * @param {{demographics:array}} data
                         */
                        resolve(data.demographics);
                    }else{
                        resolve([]);
                    }
                })
        });
    }

    setDemographic(demographic:string,checked:boolean)
    {
        let body = JSON.stringify({uuid: this.apiKey, demographic: demographic, checked: checked});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        return new Promise(resolve => {
            this.http.post(this.genApi('demographic'), body, options)
                .subscribe((data:any) => {

                    if (typeof data.id != 'undefined' && data.id != '') {
                        this.apiKey = data.id;
                    }

                    if (typeof data.success) {
                        resolve(true);
                    }else{
                        resolve(false);
                    }
                })
        });
    }


    setMessage(message:string){

        this.message = message;
        this.storage.set('message',this.message);

        this.addInfoWindow(this.me,this.message);


        let body = JSON.stringify({message: this.message, uuid: this.apiKey});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        return new Promise(resolve => {
            this.http.post(this.genApi('message'), body, options)
                .subscribe((data:any) => {

                    if (typeof data.id != 'undefined' && data.id != '') {
                        this.apiKey = data.id;
                        this.storage.set("apiKey", this.apiKey);
                    }

                    /**
                     * @param {{success:boolean}} data
                     */
                    resolve(data.success);

                });
        });

    }

    addInfoWindow(marker, content){

        content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');

        let isMe:boolean = (marker.hash == 'me');

        if(isMe)
        {
            if(typeof this.myListener != 'undefined' && this.myListener != null)
            {
                google.maps.event.clearListeners(this.myListener,'click');
                this.myListener = null;
            }
        }

        let aListener = google.maps.event.addListener(marker, 'click', () => {
            this.infoWindow.close();
            this.infoWindow.setContent(content);
            this.infoWindow.pixelOffset.width = (isMe ? -38 : -17);
            this.infoWindow.open(this.map, marker);

        });

        if(isMe)
        {
            this.myListener = aListener;
        }

    }

    myListener:any;

    attemptUpdatePosition(position:any)
    {

        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let latFuzz = (this.fuzzDistance * Math.random()) - (this.fuzzDistance * 0.5);
        let lngFuzz = (this.fuzzDistance * Math.random()) - (this.fuzzDistance * 0.5);

        let body = JSON.stringify({uuid: this.apiKey, latitude: latLng.lat() + latFuzz, longitude: latLng.lng() + lngFuzz});
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };

        this.http.post(this.genApi('locate'), body, options)
            .subscribe((data:any) => {

                if (typeof data.id != 'undefined' && data.id != '') {
                    this.apiKey = data.id;
                    this.storage.set("apiKey", this.apiKey);
                }

            });

    }

    updatePosition(position:any)
    {

        if(this.canSubmit)
        {
            this.attemptUpdatePosition(position);
        }

    }

    public audio:any;
    public playing:boolean = false;
    public paused:boolean = false;
    public playingItem:any;
    public currentPosition:any;
    public duration:any;
    public audioInterval:any;

    pause()
    {
        this.paused = true;
        this.audio.pause();
    }

    resume()
    {
        this.paused = false;
        this.audio.play();
        this.setUpdateInterval();
    }

    toggle()
    {
        if(this.paused)
        {
            this.resume();
        }else{
            this.pause();
        }

    }

    stop()
    {
        this.paused = false;
        this.playing = false;
        this.audio.pause();
        this.audio = null;
        this.clearUpdateInterval();
        this.currentPosition = 0;
        this.duration = 0;
    }

    setUpdateInterval()
    {
        this.clearUpdateInterval();
        this.audioInterval = setInterval(()=> {
            this.currentPosition = this.audio.currentTime;
            this.duration = this.audio.duration;
        },1000);
    }

    clearUpdateInterval()
    {
        if(this.audioInterval!=null)
        {
            clearInterval(this.audioInterval);
        }
        this.audioInterval = null;
    }


    // Bird Song Interface
    public birdSongUrl = "assets/sfx/birdsong.mp3";

    public birdSongTimer:any;
    public birdSongAudio: any;
    public birdSongIsPlaying:boolean;


    toggleBirdSong() {

        /*
        if (this.wittrApi.audio != null) {
            this.wittrApi.audio.stop();
        }
        this.wittrApi.audio = new Audio();
        this.wittrApi.audio.src = item.mp3;
        this.wittrApi.audio.load();
        this.wittrApi.resume();
        this.wittrApi.playingItem = item;
        this.wittrApi.playing = true;
        */


        if(this.birdSongIsPlaying){
            this.birdSongAudio.pause();
            this.birdSongAudio = null;
            this.birdSongIsPlaying = false;

            var elapsed = (new Date().getTime() - this.birdSongTimer)/1000;

            let body = JSON.stringify({time: elapsed, uuid: this.apiKey});
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            let options = { headers: headers };

            this.http.post(this.genApi('birdsong'), body, options)
                .subscribe((data:any) => {

                });

        }else{
            this.birdSongAudio = new Audio();
            this.birdSongAudio.src = this.birdSongUrl;
            this.birdSongAudio.load();
            this.birdSongAudio.play();
            this.birdSongIsPlaying = true;
        }

    }

}

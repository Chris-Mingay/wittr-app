import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {AboutPage} from "../pages/about/about";
import {CodeOfConductPage} from "../pages/code-of-conduct/code-of-conduct";
import {FundPage} from "../pages/fund/fund";
import {DemographicsPage} from "../pages/demographics/demographics";
import {FirstPage} from "../pages/first/first";
import {MapPage} from "../pages/map/map";
import {SettingsPage} from "../pages/settings/settings";
import {PrivacyPage} from "../pages/privacy/privacy";
import {PodcastPage} from "../pages/podcast/podcast";
import {WittrSettingsProvider} from "../providers/wittr-settings/wittr-settings";
import {WittrApiProvider} from "../providers/wittr-api/wittr-api";
import {BirdSongPage} from "../pages/bird-song/bird-song";
import {CreditsPage} from "../pages/credits/credits";
import {enableProdMode} from '@angular/core';

@Component({
    templateUrl: 'app.html',
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = FirstPage;
    canSwipe: boolean = false;
    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public wittrApi: WittrApiProvider,private wittrSettings:WittrSettingsProvider) {

        if (platform.is('ios')
            || platform.is('android')
            || platform.is('windows')) {
            enableProdMode();
        }


        this.initializeApp();

        // used for an example of ngFor and navigation
        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Wittr Map', component: MapPage},
            {title: 'About', component: AboutPage},
            {title: 'Bird Song', component: BirdSongPage},
            {title: 'Code Of Conduct', component: CodeOfConductPage},
            {title: 'Demographics', component: DemographicsPage},
            {title: 'Fund', component: FundPage},
            {title: 'Podcast', component: PodcastPage},
            {title: 'Privacy', component: PrivacyPage},
            {title: 'Settings', component: SettingsPage},
            {title: 'Credits', component: CreditsPage}
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();

        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
        this.canSwipe = !(page.title == 'Wittr Map');
    }
}

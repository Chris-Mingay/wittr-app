import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AboutPage} from "../pages/about/about";
import {CodeOfConductPage} from "../pages/code-of-conduct/code-of-conduct";
import { WittrApiProvider } from '../providers/wittr-api/wittr-api';
import {FundPage} from "../pages/fund/fund";
import { WittrSettingsProvider } from '../providers/wittr-settings/wittr-settings';
import {HttpClientModule} from "@angular/common/http";
import {IonicStorageModule, Storage} from '@ionic/storage';
import {Geolocation} from "@ionic-native/geolocation";
import {DemographicsPage} from "../pages/demographics/demographics";
import {FirstPage} from "../pages/first/first";
import {WelcomePage} from "../pages/welcome/welcome";
import {MapPage} from "../pages/map/map";
import {PodcastTimePipe} from "../pipes/podcast-time/podcast-time";
import {PodcastPage} from "../pages/podcast/podcast";
import {SettingsPage} from "../pages/settings/settings";
import {PrivacyPage} from "../pages/privacy/privacy";
import {WittrMessageModalPage} from "../pages/wittr-message-modal/wittr-message-modal";
import {BirdSongPage} from "../pages/bird-song/bird-song";
import {CreditsPage} from "../pages/credits/credits";
import {InAppBrowser} from "@ionic-native/in-app-browser";
//import { Diagnostic } from '@ionic-native/diagnostic';
import {CodeOfConductPageModule} from "../pages/code-of-conduct/code-of-conduct.module";
import {FundPageModule} from "../pages/fund/fund.module";
import {DemographicsPageModule} from "../pages/demographics/demographics.module";
import {FirstPageModule} from "../pages/first/first.module";
import {WelcomePageModule} from "../pages/welcome/welcome.module";
import {MapPageModule} from "../pages/map/map.module";
import {PodcastPageModule} from "../pages/podcast/podcast.module";
import {SettingsPageModule} from "../pages/settings/settings.module";
import {PrivacyPageModule} from "../pages/privacy/privacy.module";
import {WittrMessageModalPageModule} from "../pages/wittr-message-modal/wittr-message-modal.module";
import {BirdSongPageModule} from "../pages/bird-song/bird-song.module";
import {CreditsPageModule} from "../pages/credits/credits.module";
import {AboutPageModule} from "../pages/about/about.module";
import {PipesModule} from "../pipes/pipes.module";
import {Diagnostic} from "@ionic-native/diagnostic";

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        AboutPageModule,
        CodeOfConductPageModule,
        FundPageModule,
        DemographicsPageModule,
        FirstPageModule,
        WelcomePageModule,
        MapPageModule,
        PodcastPageModule,
        SettingsPageModule,
        PrivacyPageModule,
        WittrMessageModalPageModule,
        BirdSongPageModule,
        CreditsPageModule,
        PipesModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        AboutPage,
        CodeOfConductPage,
        FundPage,
        DemographicsPage,
        FirstPage,
        WelcomePage,
        MapPage,
        PodcastPage,
        SettingsPage,
        PrivacyPage,
        WittrMessageModalPage,
        BirdSongPage,
        CreditsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        WittrApiProvider,
        WittrSettingsProvider,
        Geolocation,
        InAppBrowser,
        Diagnostic
    ]
})
export class AppModule {
}

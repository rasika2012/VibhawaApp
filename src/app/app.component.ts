import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {QrReaderPage} from '../pages/qr-reader/qr-reader'
//import { TabsPage } from '../pages/tabs/tabs';
import {AboutPage} from '../pages/about/about';
import {OnlinePage} from '../pages/online/online'
import {QrReaderPage} from '../pages/qr-reader/qr-reader'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = OnlinePage;
  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public alertCtrl:AlertController) {
    platform.ready().then(() => {
      this.pages = [
        { title: 'Home', component: OnlinePage },
        { title: 'List', component: AboutPage }
      ];
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });
    
  }
  openOnlinePage(){
    this.nav.setRoot(OnlinePage);
  }
  openAboutPage(){
    this.nav.setRoot(AboutPage);
  }
  openQRPage(){
    this.nav.setRoot(QrReaderPage);
  }

  showAlert(topic:string,msg:string){
    const alert = this.alertCtrl.create({
      title: topic,
      subTitle: msg,
      buttons: ['හරි']
    });
    alert.present();
  }

}

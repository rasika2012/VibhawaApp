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

  showAlert(){
    const alert = this.alertCtrl.create({
      title: 'විභව සාහිත්‍ය සංගමය',
      subTitle: 'මෙය ',
      buttons:[{
        text: 'හරි',
        handler: data => {
          console.log('Cancel clicked');
        }
      },{
        text: 'යෝජනාවක් යොමුකරන්න',
        role: 'OK',
        handler: () => {
          this.feedBack();
        }
      }]
    });
    alert.present();
  }

  feedBack() {
    const prompt = this.alertCtrl.create({
      title: 'ඔබේ අදහස අපට කියන්න',
      message: "VibhavaApp හා ලිපි සඳහා අදහස් හා යෝජනා මෙතනින් යොමු කරන්න",
      inputs: [
        {
          name: 'title',
          placeholder: 'ඔබේ අදහස'
        },
      ],
      buttons: [
        {
          text: 'ඉවතට',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'යවන්න',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
}



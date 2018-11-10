import { Component,ViewChild } from '@angular/core';
import { Platform,Nav,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer } from '@ionic-native/email-composer';
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

  constructor(private emailComposer: EmailComposer,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public alertCtrl:AlertController) {
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
      title: 'VibhavaApp Beta - V.99',
      subTitle: 'Developed by විභව සාහිත්‍ය සංගමය (vibavainfo@gmail.com)',
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
          name: 'name',
          placeholder: 'ඔබේ නම'
        },
        {
          name: 'msg',
          placeholder: 'ඔබේ ප්‍රතිචාරය'
        }
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
            this.sendMail(data);
            console.log(data);
          }
        }
      ]
    });
    prompt.present();
  }

  sendMail(data:any){
    console.log(data.name);
    console.log(data.msg);
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
      }
     });
     
     let email = {
       to: 'vibhavainfo@gmail.com',
       
       bcc: [],
       attachments: [
         
       ],
       subject: 'App FeedBack',
       body: data.name +':'+data.msg,
       isHtml: true
     };
     this.emailComposer.open(email);
  }

}




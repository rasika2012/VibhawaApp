import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform ,AlertController} from 'ionic-angular';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';


/**
 * Generated class for the OnlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-online',
  templateUrl: 'online.html',
})
export class OnlinePage {
  films: any;
  articles:any=[
      {"author": "" ,
      "topic":"Loading..",
      "shortNote":"",
      "content":"",
      "img":[""],
      "disp":"","but":"more...",
      "icon":"",
      "links":[""]
    },
  ];
  constructor(public alertCtrl:AlertController,public httpClient: HttpClient,private iab: InAppBrowser ,public navCtrl: NavController, public navParams: NavParams,public platform :Platform) {
   
   
   this.films = this.httpClient.get('https://rasika2012.github.io/backendApp/index.json',);
   this.films
   .subscribe(data => {
     console.log(this.articles);
     this.articles=data;
     console.log('my data: ', data);
   },(err)=>{
      this.showAlert("ගැටලුවක්!","අන්තර්ජාලය සම සම්බන්ධ විය නොහැක,කරුනාකර නැවත උත්සාහ කරන්න")
   })
  
  }

  ionViewDidLoad() {
    console.log('sddsds');
  }
  convertToJson(){
    var obj = JSON.stringify(this.articles);
    console.log(obj);
  }

  reloadarticle(){
    
   this.films = this.httpClient.get('https://rasika2012.github.io/backendApp/index.json',);
   this.films
   .subscribe(data => {
     console.log(this.articles);
     this.articles=data;
     console.log('my data: ', data);
   },(err)=>{
    this.showAlert("ගැටලුවක්!","අන්තර්ජාලය සම සම්බන්ධ විය නොහැක,කරුනාකර නැවත උත්සාහ කරන්න");
   })
  }

  showArticle(item){
    this.convertToJson();
    if(item.disp==item.content){
      item.disp=item.shortNote;
      item.but="more..."

    }else{
      item.disp=item.content;
      item.but="less..."
    }
  }
  showAlert(topic:string,msg:string){
    const alert = this.alertCtrl.create({
      title: topic,
      subTitle: msg,
      buttons: [{
        text: 'හරි',
        role: 'OK',
        handler: () => {
          this.reloadarticle();
        }
      }]
    });
    alert.present();
  }
  openUrl(url:string){
    const   options : InAppBrowserOptions = {
      location : 'yes',//Or 'no' 
      hidden : 'no', //Or  'yes'
      clearcache : 'yes',
      clearsessioncache : 'yes',
      zoom : 'yes',//Android only ,shows browser zoom controls 
      hardwareback : 'yes',
      mediaPlaybackRequiresUserAction : 'no',
      shouldPauseOnSuspend : 'no', //Android only 
        
  };
  this.iab.create(url,'_system',options);
  }

  

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform ,AlertController} from 'ionic-angular';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  link: any;
  articles:any=[
      {"author": "Loading.." ,
      "topic":"Loading..",
      "shortNote": ["c","v"],
      "content":["c","v"],
      "img":[""],
      "disp":["a","b"],"but":"more...",
      "icon":"",
      "links":[""],
      "id":""
    },
  ];
  constructor(private storage: Storage,public alertCtrl:AlertController,public httpClient: HttpClient,private iab: InAppBrowser ,public navCtrl: NavController, public navParams: NavParams,public platform :Platform) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
    this.getArticles()
   this.link = this.httpClient.get('https://vibhavauop.github.io/backendApp/kavi.json',);
   this.link.subscribe(data => {
     console.log(this.articles);
     this.articles=data;
     console.log('my data: ', data);
     this.saveToStorage();
     console.log(data);
   },(err)=>{
      this.showAlert("ගැටලුවක්!","අන්තර්ජාලය හා සම්බන්ධ විය නොහැක")
   });
  }
  convertToJson(){
    var obj = JSON.stringify(this.articles);
    console.log(obj);
  }

  reloadarticle(){
   this.link = this.httpClient.get('https://vibhavauop.github.io/backendApp/kavi.json',);
   this.link
   .subscribe(data => {
     console.log(this.articles);
     this.articles=data;
     console.log('my data: ', data);
     this.saveToStorage()
   },(err)=>{
    this.showAlert("ගැටලුවක්!","අන්තර්ජාලය හා සම්බන්ධ විය නොහැක.කරුණාකර සබඳතාවය නැවත පරීක්ෂා කරනන්න.");
   });
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
        text: 'එපා',
        handler: data => {
          console.log('Cancel clicked');
        }
      },{
        text: 'නැවත උත්සාහ කරන්න',
        role: 'OK',
        handler: () => {
          this.reloadarticle();
        }
      }]
    });
    alert.present();
  }
  saveToStorage(){
    this.storage.set('article_kavi', this.articles);
  }

  getArticles(){
    this.storage.get('article_kavi').then((val) => {
      this.articles=val;
    });
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
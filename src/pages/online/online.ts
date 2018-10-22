import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';
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
  
  articles:any=[
      {"author": "Hapaya" ,
      "topic":"dssdsdsd",
      "shortNote":" වැඩේට ඔයාගෙනුත් පොඩි සහයෝගයක් බලාපොරොත්තු වෙනවා",
      "content":"ආයුබෝවන් කටිටියටම ඔන්න එහෙනම් මමත් හා හා පුරා කියල සිංහලෙන් බ්ලොග් එකක් කොටන්න පටන් ගත්ත.ඉස් ඉස්සෙල්ලම අතගහපු වැඩේට ඔයාගෙනුත් පොඩි සහයෝගයක් බලාපොරොත්තු වෙනවා.වැඩිය මුකුත් ඕන නෑ මං ඉස්සරහට හොද හොද ඒවා දානව මේකේ. ඉතින් ඔයාලට කරන්න තියෙන්නෙ මෙච්චරයි. මගේ මේ බ්ලොග් එක Follow කලා නම් ඈති. ඒක මට ලොකු හයියක්. \n මුල්ම වැඩේ එහෙනම් තව පොඩ්ඩකින් බලා ගන්න පුළුවන් ඔයාලට..",
      "img":["https://2.bp.blogspot.com/-rAl9hdMLxZM/USSV5qX36PI/AAAAAAAABOU/BHA9BjH8xB8/s1600/Peradeniya+University+Sri+Lanka+Campus+News++www.lankauniversity-news.com+(19).jpg","https://2.bp.blogspot.com/-rAl9hdMLxZM/USSV5qX36PI/AAAAAAAABOU/BHA9BjH8xB8/s1600/Peradeniya+University+Sri+Lanka+Campus+News++www.lankauniversity-news.com+(19).jpg"],
      "disp":"asdsadadad","but":"more...",
      "icon":"https://2.bp.blogspot.com/-rAl9hdMLxZM/USSV5qX36PI/AAAAAAAABOU/BHA9BjH8xB8/s1600/Peradeniya+University+Sri+Lanka+Campus+News++www.lankauniversity-news.com+(19).jpg",
      "links":["https://2.bp.blogspot.com/-rAl9hdMLxZM/USSV5qX36PI/AAAAAAAABOU/BHA9BjH8xB8/s1600/Peradeniya+University+Sri+Lanka+Campus+News++www.lankauniversity-news.com+(19).jpg","https://2.bp.blogspot.com/-rAl9hdMLxZM/USSV5qX36PI/AAAAAAAABOU/BHA9BjH8xB8/s1600/Peradeniya+University+Sri+Lanka+Campus+News++www.lankauniversity-news.com+(19).jpg"],
    },
  ];
  constructor(private iab: InAppBrowser ,public navCtrl: NavController, public navParams: NavParams,public platform :Platform) {
  }

  ionViewDidLoad() {
    console.log('sddsds');
  }
  convertToJson(){
    var obj = JSON.stringify(this.articles);
    
    console.log(obj);
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

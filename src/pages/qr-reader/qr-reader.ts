import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the QrReaderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qr-reader',
  templateUrl: 'qr-reader.html',
})
export class QrReaderPage {
  items:Array<any>;
  link:any;
  //items_tmp:Array<string>;
  constructor(public httpClient: HttpClient,private storage: Storage,private iab: InAppBrowser,public navCtrl: NavController,private barcodeScanner: BarcodeScanner, public navParams: NavParams,public alertCtrl:AlertController) {
  }
  
  addQR(){
    const alert = this.alertCtrl.create({
      title: 'නව QR කේතයක් ඇතුල් කිරීම ට උපදෙස්',
      subTitle: 'සඟරාවේ ඇති QR කේතය හොදින් පෙනෙන සේ කැමරාවට අල්ලන්න',
      buttons: [{
        text: 'හරි',
        role: 'OK',
        handler: () => {
          this.barcodeScanner.scan().then((barcodeData) => {
            this.link = this.httpClient.get(barcodeData.text,);
            this.link
            .subscribe(data => {
            this.saveCode(data);
            console.log('my data: ', data);
            this.saveToStorage()
            //this.showAlert("නව කේතය ",barcodeData.text);
   },(err)=>{
    this.showAlert("ගැටලුවක්!","අන්තර්ජාලය හා සම්බන්ධ විය නොහැක හෝ QR කේතයේ වැරැද්දක් ");
   })
            //this.saveCode(barcodeData.text);
            //this.showAlert("නව කේතය ",barcodeData.text);
           }).catch(err => {
              //this.items.push("sdadsda");
              this.showAlert("නව කේතයහි වැරැද්දක්","කරුනාකර නැවත උත්සාහ කරන්න");
              
           });
        }
      }]
    });
    alert.present();
    
    
  }
  ionViewDidLoad() {
    this.items=[{"name":"විභව Facebook පිටුව",
    "article_name":"ඔබට අප හා Facebook තුලින්ද සම්බන්ධ විය හැක",
    "date":"2018.11.1",
    "discription":"වැඩිදුර තොරතුරු සඳහා පිවිසෙන්න",
    "icon":"https://rasika2012.github.io/backendApp/res/dasuni1.webp",
    "links":["www.facebook.com/VibhavamagazineUOP"]}
];
//this.saveToStorage();
    console.log(this.items)
    this.storage.get('qr_list').then((val) => {
      if(val.length==0){
        this.saveToStorage();
      }
      
    }).catch(err=>{
    
      this.saveToStorage();
    }).then(done=>{
      this.getCodes();
    });
    
    
    //this.visitCode("http://google.com");
    console.log('ionViewDidLoad QrReaderPage');
  }

  showAlert(topic:string,msg:string){
    const alert = this.alertCtrl.create({
      title: topic,
      subTitle: msg,
      buttons: ['හරි']
    });
    alert.present();
  }

  visitCode(url:string){
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
  saveCode(link:string){
    
    var numbers = new Array<string>();
    numbers=this.items;
    numbers.push(link);

    console.log(this.items.length);
    
    this.items=numbers;
    this.saveToStorage();
  }
  saveToStorage(){
    this.storage.set('qr_list', this.items);
  }
  getCodes(){
    this.storage.get('qr_list').then((val) => {
      this.items=val;
    });
  }
  deleteCode(item:any){
    let index = this.items.indexOf(item); 

    if(index > -1){
      this.items.splice(index, 1);
      this.saveToStorage();
    }

  }
}

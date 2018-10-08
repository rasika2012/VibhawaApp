import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { InAppBrowser ,InAppBrowserOptions} from '@ionic-native/in-app-browser';
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
  items:Array<string>;
  //items_tmp:Array<string>;
  constructor(private storage: Storage,private iab: InAppBrowser,public navCtrl: NavController,private barcodeScanner: BarcodeScanner, public navParams: NavParams,public alertCtrl:AlertController) {
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
            this.saveCode(barcodeData.text);
            this.showAlert("නව කේතය ",barcodeData.text);
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
    this.items=['sample.google.com'];
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

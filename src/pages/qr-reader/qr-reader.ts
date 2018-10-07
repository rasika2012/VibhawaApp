import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
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
  items:any;

  constructor(public navCtrl: NavController,private barcodeScanner: BarcodeScanner, public navParams: NavParams,public alertCtrl:AlertController) {
  }

  addQR(){
    const alert = this.alertCtrl.create({
      title: 'නව QR කේතයක් ඇතුල් කිරීම ට උපදෙස්',
      subTitle: 'සඟරාවේ ඇති QR කේතය හොදින් පෙනෙන සේ කැමරාවට අල්ලන්න',
      buttons: [{
        text: 'හරි',
        role: 'OK',
        handler: () => {
          this.barcodeScanner.scan().then(barcodeData => {
            if(barcodeData.text.length>5)
            this.showAlert("නව කේතය ",barcodeData.text);
           }).catch(err => {
               this.showAlert("නව කේතයහි වැරැද්දක්","කරුනාකර නැවත උත්සාහ කරන්න");
           });
        }
      }]
    });
    alert.present();

    
  }
  ionViewDidLoad() {
    this.items=["aa","aaa"];
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

}

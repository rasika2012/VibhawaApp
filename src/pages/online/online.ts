import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

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
  height:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public platform :Platform) {
  }

  ionViewDidLoad() {
    this.height=500;
    this.height=this.platform.height();
    console.log('ionViewDidLoad OnlinePage');
  }

}

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingListItemsProvider } from '../../providers/shopping-list-items/shopping-list-items';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ShoppingListItemsProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getItems();
  }

  getItems() {
    this.api.getItems()
       .subscribe(
         items => this.items = items,
         error =>  this.errorMessage = <any>error);
  }

  complete(item) {
    this.api.complete(item).then(item => this.getItems());
  }

  delete(item) {
    this.api.delete(item).then(() => this.getItems());
  }

  addItem(label: string) {
    const item = {
      label: label,
      isCompleted: false
    };

    this.api.addItem(item).then(item => this.getItems());
  }

  addPrompt() {
    let alert = this.alertCtrl.create({
      title: 'New Item',
      inputs: [
        {
          name: 'label',
          placeholder: 'Label'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: data => {
            this.addItem(data.label);
          }
        }
      ]
    });
    alert.present();
  }
}

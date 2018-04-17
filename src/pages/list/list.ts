import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingListItemsProvider } from '../../providers/shopping-list-items/shopping-list-items';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ShoppingListItemsProvider) {

  }

  ionViewDidLoad() {
    this.getItems();
  }

  getItems() {
    this.api.getItems()
       .subscribe(
         countries => this.items = countries,
         error =>  this.errorMessage = <any>error);
  }
}

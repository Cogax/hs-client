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
         items => this.items = items,
         error =>  this.errorMessage = <any>error);
  }

  complete(item) {
    this.api.complete(item).then(item => {
      // wtf??
      let is = <Array<{id: number}>>this.items;
      console.log(is);
      is = is.filter(i => i.id !== item['id']);
      console.log(is);
      this.items = <any>is;
  });
  }
}

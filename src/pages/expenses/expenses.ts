import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ExpensesProvider } from '../../providers/finance/expenses';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html'
})
export class ExpensesPage {
  expenses: any;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ExpensesProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.getItems();
  }

  getItems() {
    this.api.getExpenses()
       .subscribe(
         expenses => this.expenses = expenses,
         error =>  this.errorMessage = <any>error);
  }

  createExpense(label: string, amount: number) {
    const expense = {
      label: label,
      amount: amount
    };

    this.api.addExpense(expense).then(item => this.getItems());
  }

  addPrompt() {
    let alert = this.alertCtrl.create({
      title: 'New Expense',
      inputs: [
        {
          name: 'label',
          placeholder: 'Label'
        },
        {
          name: 'amount',
          placeholder: 'Amount'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: data => {
            this.createExpense(data.label, data.amount);
          }
        }
      ]
    });
    alert.present();
  }
}

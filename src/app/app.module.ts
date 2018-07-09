import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ExpensesPage } from '../pages/expenses/expenses';

import { HttpClientModule } from '@angular/common/http'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ShoppingListItemsProvider } from '../providers/shopping-list-items/shopping-list-items';
import { ExpensesProvider } from '../providers/finance/expenses';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ExpensesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ExpensesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListItemsProvider,
    ExpensesProvider
  ]
})
export class AppModule {}

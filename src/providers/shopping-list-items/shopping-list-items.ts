import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ShoppingListItemsProvider {
  private apiUrl = 'http://homespotshoppinglistapi.azurewebsites.net/api/shoppinglistitem';

  constructor(public http: HttpClient) {
    console.log('Hello ShoppingListItemsProvider Provider');
  }

  getItems(): Observable<{}> {
    return this.http.get(this.apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  complete(item) {
    item.isComplete = true;

    const 
      headers = new HttpHeaders().set("Content-Type", "application/json"),
      body = JSON.stringify(item);

    return this.http.put(this.apiUrl + "/" + item.id, body, {headers}).toPromise();
  }

  addItem(item) {
    const 
      headers = new HttpHeaders().set("Content-Type", "application/json"),
      body = JSON.stringify(item);

    return this.http.post(this.apiUrl, body, {headers}).toPromise();
  }

  delete(item) {
    const 
      headers = new HttpHeaders().set("Content-Type", "application/json");

    return this.http.delete(this.apiUrl + "/" + item.id, {headers}).toPromise();
  }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

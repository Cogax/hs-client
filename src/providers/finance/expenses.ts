import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ExpensesProvider {
  private apiUrl = 'http://homespotfinanceapi.azurewebsites.net/api/expense';

  constructor(public http: HttpClient) {
    console.log('Hello Expenses Provider');
  }

  getExpenses(): Observable<{}> {
    return this.http.get(this.apiUrl).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  addExpense(expense) {
    const 
      headers = new HttpHeaders().set("Content-Type", "application/json"),
      body = JSON.stringify(expense);

    return this.http.post(this.apiUrl, body, {headers}).toPromise();
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

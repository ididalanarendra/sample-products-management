import {IProduct} from './product';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';
  products: IProduct[];
  constructor(private http: HttpClient) {
  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => {console.log('All: ' + JSON.stringify(data));
                   this.products = data ; }
      ),
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line:typedef
    private handleError(err: HttpErrorResponse) {
      let errorMessage = '';
      if (err.error instanceof  ErrorEvent){
        errorMessage = `An error occurred: ${err.error.message}`;
      }else {
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
    }
}

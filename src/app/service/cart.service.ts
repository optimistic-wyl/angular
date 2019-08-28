import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ShippingFee {
  type: string;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  items = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getShippingFee() {
    return this.http.get<Array<ShippingFee>>('/assets/shipping.json');
  }

  getShippingFeeResponse(): Observable<HttpResponse<ShippingFee[]>> {
    return this.http.get<Array<ShippingFee>>('/assets/shipping.json', { observe: 'response' });
  }

  getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, {responseType: 'text'})
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  }
  logError(filename: string, error: any): void {
    console.log('logError:', ...arguments);
  }
  log(filename: string, data: string): void {
    console.log('log:', ...arguments);
  }
}

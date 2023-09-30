import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../home/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/json/products.json', { headers: this.headersMethod() })
  }

  private headersMethod(): HttpHeaders {
    return new HttpHeaders()
    .set("Accept", 'application/json')
    .set('Content-Type', 'application/json')
    .set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
    .set("Access-Control-Allow-Headers", "Origin, Content-Type, content-type")
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private httpClient: HttpClient) {}

  // Used to make a GET request to the API
  // we are invoking HttpClient, calling GET method of T, passing url and Options inside request,
  // we must convert our result to Observable of T (T will be PaginatorProducts)
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  // Used to make a POST request to the API
  // we are invoking HttpClient, calling POST method of T, passing url, Product and Options inside request,
  // we must convert our result to Observable of T (T will be PaginatorProducts)
  post<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  // Used to make a PUT request to the API
  // we are invoking HttpClient, calling PUT method of T, passing url, Product and Options inside request,
  // we must convert our result to Observable of T (T will be PaginatorProducts)
  put<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  // Used to make a DELETE request to the API
  // we are invoking HttpClient, calling DELETE method of T, passing url and Options inside request,
  // we must convert our result to Observable of T
  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}

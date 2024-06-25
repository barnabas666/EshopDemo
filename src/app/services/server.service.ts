import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../models/models';

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
}

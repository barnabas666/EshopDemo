import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

// interface for single Product
export interface Product {
  id?: number;
  price: string;
  name: string;
  image: string;
  rating: number;
}

// interface for PaginatorProducts, array of Product + info for Paginator
export interface PaginatorProducts {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// interface for options parameter from ServerService get method
export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}
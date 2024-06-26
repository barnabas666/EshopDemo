import { Component } from '@angular/core';
import { PaginatorProducts, Product } from '../models/models';
import { ProductComponent } from '../product/product.component';
import { ServerService } from '../services/server.service';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-eshop',
  standalone: true,
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss',
  imports: [ProductComponent, PaginatorModule],
})
export class EshopComponent {
  title = "Barny's Eshop";

  products: Product[] = [];

  // every time we get Products from server we set number of all products
  totalRecords: number = 0;
  // number of Products per Page
  perPage: number = 5;

  constructor(private serverService: ServerService) {}

  // At start of app we ask for Products from our server
  ngOnInit() {
    this.getProducts(0, this.perPage);
  }

  /* callback function for event emitted every time we change page (using Paginator), we get again Products
     from our server with diff page and number of rows per page which we get from event params */
  onPageChange(event: any) {
    this.getProducts(event.page, event.rows);
  }

  // we invoke get method and subscribe to Observable which we get from that method
  // Observable is something like promise (or like in async - we just awaiting Task to be completed)
  // result of this we call products which is type PaginatorProducts and we assign it to our
  // products property (which we later pass to ProductComponent as @Input property).
  getProducts(page: number, perPage: number) {
    this.serverService
      .get<PaginatorProducts>('http://localhost:3000/clothes', {
        params: {
          page,
          perPage,
        },
        responseType: 'json',
      })
      .subscribe((products: PaginatorProducts) => {
        (this.products = products.items), (this.totalRecords = products.total);
      });
  }
}

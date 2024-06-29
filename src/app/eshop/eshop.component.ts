import { Component } from '@angular/core';
import { PaginatorProducts, Product } from '../models/models';
import { ProductComponent } from '../product/product.component';
import { ServerService } from '../services/server.service';
import { PaginatorModule } from 'primeng/paginator';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-eshop',
  standalone: true,
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss',
  imports: [ProductComponent, PaginatorModule, AddEditComponent, ButtonModule],
})
export class EshopComponent {
  title = "Barny's Eshop";

  products: Product[] = [];

  // every time we get Products from server we set number of all products
  totalRecords: number = 0;
  // number of Products per Page
  perPage: number = 5;

  // variable used to manage displaying Add Popup inside AddEditComponent (PrimeNG Popup visible prop)
  displayAddPopup: boolean = false;

  constructor(private serverService: ServerService) {}

  // At start of app we ask for Products from our server
  ngOnInit() {
    this.getProducts(0, this.perPage);
  }

  // Add button callback - display Add Product Popup Comp = AddEditComponent (PrimeNG Comp) in Add version
  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  /* callback function for event emitted every time we change page (using Paginator), we get again Products
     from our server with diff page and number of rows per page which we get from event params */
  onPageChange(event: any) {
    this.getProducts(event.page, event.rows);
  }

  /* callback function for event emitted every time we Confirm to Add new Product, we make POST request to server, 
  after that we close corresponding Popup */
  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  /* we invoke get method (page and perPage are paremeters which we get from onPageChange event) and subscribe
     to Observable which we get from that method. Observable is something like promise (or like in async - we 
     just awaiting Task to be completed), result of this we call data which is of type PaginatorProducts and 
     we assign it to our this.products property and number of products to this.totalRecords property.
     OK after some changes we split response into 2 functions like in methods below which handle successful and
     error response, next and error are properties inside subscribe() method */
  getProducts(page: number, perPage: number) {
    this.serverService
      .get<PaginatorProducts>('http://localhost:3000/clothes', {
        params: {
          page,
          perPage,
        },
        responseType: 'json',
      })
      .subscribe({
        next: (data: PaginatorProducts) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /* we invoke post method (product is parameter which we will get from onConfirmAdd event) 
     and subscribe to Observable which we get from that method, here we split response into 2 functions, 
     first handle successful request and second for errors. next and error are properties inside subscribe()
     method, next will work with data we get and will call again fetchProducts() method with default parameters. */
  addProduct(product: Product) {
    this.serverService
      .post(`http://localhost:3000/clothes`, product, {})
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, this.perPage);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /* we invoke put method (product and id are parameters which we will get from onConfirmEdit event) 
     and subscribe to Observable which we get from that method, here we split response into 2 functions, 
     first handle successful request and second for errors. next and error are properties inside subscribe()
     method, next will work with data we get and will call again getProducts() method with default parameters. */
  editProduct(product: Product, id: number) {
    this.serverService
      .put<PaginatorProducts>(
        `http://localhost:3000/clothes/${id}`,
        product,
        {}
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, this.perPage);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /* we invoke delete method (id is paremeter which we will get from toggleDeletePopup event) 
     and subscribe to Observable which we get from that method, here we split response into 2 functions, 
     first handle successful request and second for errors. next and error are properties inside subscribe()
     method, next will work with data we get and will call again getProducts() method with default parameters. */
  deleteProduct(id: number) {
    this.serverService
      .delete(`http://localhost:3000/clothes/${id}`, {})
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProducts(0, this.perPage);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

import { Component, ViewChild } from '@angular/core';
import { PaginatorProducts, Product } from '../models/models';
import { ProductComponent } from '../product/product.component';
import { ServerService } from '../services/server.service';
import { Paginator, PaginatorModule } from 'primeng/paginator';
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

  // variables used to manage displaying AddEditComponent in Add/Edit versions (PrimeNG Popup visible prop)
  displayAddComponent: boolean = false;
  displayEditComponent: boolean = false;

  /* Current Product to be edited which we get from ProductComponent through @Output (edit) event, than we pass 
  it to AddEditComponent using @Input [product] property (its bound to that prop) */
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  // Accessing instance of Paginator Comp with use of hashtag #paginator
  @ViewChild('paginator') paginator: Paginator | undefined;

  constructor(private serverService: ServerService) {}

  // At start of app we ask for collection of Products from our server
  ngOnInit() {
    this.getProducts(0, this.perPage);
  }

  // Add button callback - display AddEditComponent (PrimeNG Comp) in Add version
  toggleAddComponent() {
    this.displayAddComponent = true;
  }

  /* Callback for @Output (edit) event from ProductComponent - we assign Product which we get from ProductComponent
   as @Output (edit) property to selectedProduct (which is bound to @Input [product] prop from AddEditComponent) 
   and we display AddEditComponent (PrimeNG Comp) in Edit version */
  toggleEditComponent(product: Product) {
    this.selectedProduct = product;
    this.displayEditComponent = true;
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
    this.displayAddComponent = false;
  }

  /* callback function for event emitted every time we Confirm to Edit existing Product, if there is no selected 
  product (id == 0 => false) close function, we make PUT request to server and after that we close corresponding Popup */
  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditComponent = false;
  }

  /* callback function for event emitted every time we Confirm to Delete existing Product - if product which we get 
  from ProductComponent as @Output (delete) property has id than we delete this product - make DELETE request to server */
  onConfirmDelete(product: Product) {
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id);
  }

  // if paginator exists than change it to Page 0
  resetPaginator() {
    this.paginator?.changePage(0);
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
          this.resetPaginator();
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
          this.resetPaginator();
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
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

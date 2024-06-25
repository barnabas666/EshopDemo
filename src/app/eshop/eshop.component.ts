import { Component } from '@angular/core';
import { PaginatorProducts, Product } from '../models/models';
import { ProductComponent } from '../product/product.component';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-eshop',
  standalone: true,
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss',
  imports: [ProductComponent],
})
export class EshopComponent {
  title = "Barny's Eshop";

  // array of Product which we get from ngOnInit() getProducts() method which returns PaginatorProducts
  // which contains items property of type Product[]
  // products: Product[] = [
  //   {
  //     "id": 1,
  //     "image": "assets/images/products/image1.jpg",
  //     "name": "Black Hoodie",
  //     "price": "24",
  //     "rating": 5
  //   },
  //   {
  //     "id": 2,
  //     "name": "Branded Shoes",
  //     "image": "assets/images/products/image2.jpg",
  //     "price": "13.5",
  //     "rating": 4
  //   },
  //   {
  //     "id": 3,
  //     "image": "assets/images/products/image3.jpg",
  //     "name": "White",
  //     "price": "85.0",
  //     "rating": 3
  //   },
  //   {
  //     "id": 4,
  //     "image": "assets/images/products/image4.jpg",
  //     "name": "Gray Dress 1",
  //     "price": "625",
  //     "rating": 3
  //   },
  //   {
  //     "id": 5,
  //     "name": "Black T-Shirt (Mens)",
  //     "image": "assets/images/products/image5.jpg",
  //     "price": "55.0",
  //     "rating": 5
  //   },
  //   {
  //     "id": 6,
  //     "name": "Jeans Jacket",
  //     "image": "assets/images/products/image6.jpg",
  //     "price": "115.0",
  //     "rating": 4
  //   },
  // ];

  products: Product[] = [];
  page: number = 0;
  perPage: number = 6;

  constructor(private serverService: ServerService) {}

  // we invoke get method and subscribe to Observable which we get from that method
  // Observable is something like promise (or like in async - we just awaiting Task to be completed)
  // result of this we call products which is type PaginatorProducts and we assign it to our  
  // products property which we pass to ProductComponent as @Input property.
  ngOnInit() {
    this.serverService
      .get<PaginatorProducts>('http://localhost:3000/clothes', {
        params: {
          page: this.page,
          perPage: this.perPage,
        },
        responseType: 'json',
      })
      .subscribe(
        (products: PaginatorProducts) => (this.products = products.items)
      );
  }
}

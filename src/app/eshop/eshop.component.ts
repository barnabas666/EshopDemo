import { Component } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-eshop',
  standalone: true,
  imports: [],
  templateUrl: './eshop.component.html',
  styleUrl: './eshop.component.scss',
})
export class EshopComponent {
  title = "Barny's Eshop";

  items: Product[] = [
    {
      id: 1,
      name: 'Black Hoodie',
      image: 'assets/images/products/image1.jpg',
      price: '21',
    },
    {
      id: 2,
      name: 'Branded Shoes',
      image: 'assets/images/products/image2.jpg',
      price: '13.5',
    },
    {
      id: 3,
      name: 'White',
      image: 'assets/images/products/image3.jpg',
      price: '69.0',
    },
    {
      id: 4,
      name: 'Gray Dress 1',
      image: 'assets/images/products/image4.jpg',
      price: '315',
    },
    {
      id: 5,
      name: 'Black T-Shirt (Mens)',
      image: 'assets/images/products/image5.jpg',
      price: '55.0',
    },
    {
      id: 6,
      name: 'Jeans Jacket',
      image: 'assets/images/products/image6.jpg',
      price: '115.0',
    },
  ];
}

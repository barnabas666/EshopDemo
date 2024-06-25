import { Component, Input } from '@angular/core';
import { Product } from '../models/models';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  
  // @Input() property with exclamation mark - we assume that on initialization Product will
  // be always provided
  @Input() product!: Product;
}

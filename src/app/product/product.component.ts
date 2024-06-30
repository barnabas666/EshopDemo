import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../models/models';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  // @Input() property with exclamation mark - we assume that on initialization Product will
  // be always provided
  @Input() product!: Product;

  // @Output event used to pass selected Product back to our EshopComponent
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();

  // @Output event used to pass selected Product back to our EshopComponent
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  // ConfirmationService to confirm or cancel our choice - here Delete Product
  constructor(private confirmationService: ConfirmationService) {}

  /* Edit button callback, we emit Product to be edited back to EshopComponent where we pass this 
    Product to AddEditComponent which we display */
  editProduct() {
    this.edit.emit(this.product);
  }

  /* Delete button callback to emit Product back to EshopComponent where we make DELETE request 
  to our server, but first it will popup confirmation service */
  deleteProduct() {
    this.confirmDelete();
  }

  /* We show confirmation message and on accept we send back to EshopComponent product to be 
  deleted = make DELETE request */
  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        this.delete.emit(this.product);
      },
    });
  }
}

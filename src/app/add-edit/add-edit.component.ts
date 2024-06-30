import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../models/models';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-edit',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, ButtonModule],
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
})
export class AddEditComponent {
  // @Input which allows us to set visibility for PrimeNG "Popup" Dynamic Dialog
  @Input() display: boolean = false;
  // @Input header, we will always provide value (Add/Edit) for it
  @Input() header!: string;

  /* @Output to send back to EshopComponent (changing @Input display property) - changing there 
   displayAddComponent and displayEditComponent props */
  @Output() displayChange = new EventEmitter<boolean>();
  // @Output which will be called every time we want to confirm Add/Edit action and will
  // emit that Product back to EshopComponent
  @Output() confirm = new EventEmitter<Product>();
  // @Output which will be called every time we want to cancel Add/Edit action.
  @Output() cancel = new EventEmitter<any>();

  // @Input product for Edit action send from EshopComponent
  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  /* onConfirm callback which will through @Output (confirm) event emit Product back to EshopComponent. 
  Than we close this "Popup" Dialog and finally we emit @Output (displayChange) event, it will pass "false"
  value back to EshopComponent like in onCancel callback. But here its little redundant to emit this (displaychange)
  cause when we emit (confirm) event than in EshopComponent callback we manually set display prop to false (we dont have 
  (cancel) event inside onCancel callback so there we must do it). */
  onConfirm() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display); // emit value of display to EshopComponent
  }

  /* onCancel callback which will close this "Popup" Dialog, than we emit @Output (displayChange) event, 
  it will pass "false" value back to EshopComponent. If we dont set displayAddComponent/displayEditComponent props
  inside EshopComponent back to false than after we cancel Add/Edit Popup and try to click it again -
  nothing happens. */
  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}

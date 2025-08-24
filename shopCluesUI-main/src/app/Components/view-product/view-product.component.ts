import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../Service/service.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
   constructor(
    private route: ActivatedRoute,
    private service: ServiceService
  ) {}
  product: any;
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.service.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          console.log('Product details:', data);
        },
        error: (err) => {
          console.error('API error:', err);
        }
      });
    }
  }

  cartQty: number = 1;
addedToCart: boolean = false;

incrementQty() {
  if (this.product && this.cartQty < this.product.availabilityQty) {
    const newQty = this.cartQty + 1;
    this.service.addToCart(1, this.product.id, 1, 'add').subscribe({
      next: () => {
        this.cartQty = newQty;
      },
      error: (err) => {
        console.error('Error incrementing quantity:', err);
      }
    });
  }
}

decrementQty() {
  if (this.product && this.cartQty > 1) {
    const newQty = this.cartQty - 1;
    this.service.addToCart(1, this.product.id, 1, 'remove').subscribe({
      next: () => {
        this.cartQty = newQty;
      },
      error: (err) => {
        console.error('Error decrementing quantity:', err);
      }
    });
  }
}

addToCart() {
  this.service.addToCart(1, this.product.id, this.cartQty, 'add').subscribe({
    next: () => {
      this.addedToCart = true;
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
    }
  });
}

removeFromCart() {
  this.service.removeCartItem(1, this.product.id).subscribe({
    next: () => {
      this.addedToCart = false;
      this.cartQty = 1;
    },
    error: (err) => {
      console.error('Error removing from cart:', err);
    }
  });
}

}
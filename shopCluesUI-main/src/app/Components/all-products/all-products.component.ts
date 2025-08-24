import { Component } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
constructor(private service: ServiceService, private router: Router) {}
products: any[] = [];
  ngOnInit(): void {
    this.service.getAllProducts().subscribe({
      next: (data) => {
        console.log('All Products:', data);
        this.products = Array.isArray(data) ? data : [];
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  viewProduct(product: any) {
 if (product && product.id) {
      this.router.navigate(['/view-product', product.id]);
    }
  }
}

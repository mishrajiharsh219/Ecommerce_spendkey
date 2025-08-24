import { Component } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-by-categories',
  templateUrl: './products-by-categories.component.html',
  styleUrl: './products-by-categories.component.css'
})
export class ProductsByCategoriesComponent {
constructor(private router: Router,  private route: ActivatedRoute,
    private service: ServiceService) {}
products: any[] = [];
  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if(!categoryId)
    {
      return;
    }
    this.service.getProductsByCategory(categoryId).subscribe({
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

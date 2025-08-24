import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ServiceService } from '../../Service/service.service';
import { Router } from '@angular/router';
import { SharedServiceService } from '../../Service/shared-service.service';
import { Category } from '../../models/Category.interface';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css',
  // Remove OnPush or add manual change detection
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit, OnDestroy {
  
  carouselImages = [
    'assets/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.webp',
    'assets/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.webp',
    'assets/179e278f-77ee-44c2-bf39-9f00b0cd08e01658752429301-Handbags_Desk.webp',
    'assets/4031994d-9092-4aa7-aea1-f52f2ae5194f1654006594976-Activewear_DK.webp',
    'assets/c3beb3ae-6895-458f-b1e0-f97becf05c5d1750618551514-Desktop-Banner--2---1-.webp',
  ];
  
  currentIndex = 0;
  intervalId: any;
  products$: any;
  categories: Category[] = [];
  
  // Track expanded categories by their IDs
  expandedCategories = new Set<number>();

  constructor(
    public service: ServiceService, 
    private router: Router, 
    public sharedService: SharedServiceService,
    private cdr: ChangeDetectorRef // Add this for manual change detection
  ) {
    this.products$ = this.service.getAllProductsData();
  }

  ngOnInit(): void {
    this.service.getAllProductsData().subscribe((res: Category[]) => {
      this.categories = res;
      console.log('Categories loaded:', this.categories); // Debug log
      this.cdr.detectChanges(); // Trigger change detection
    });
    
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
    }, 3000);
  }

  selectImage(index: number) {
    this.currentIndex = index;
  }

  onCategoryClick(category: Category, event?: Event): void {
    // Prevent event bubbling
    if (event) {
      event.stopPropagation();
    }

    console.log('Category clicked:', category); // Debug log

    // If category has children, toggle expand/collapse
    if (this.hasChildren(category)) {
      this.toggleExpand(category.id);
    }
    else{
      this.router.navigate(['/product-by-category', category.id]);
    }

    console.log('Selected category:', category);
    // Add your category selection logic here
  }

  toggleExpand(categoryId: number): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
    }
    
    console.log('Expanded categories:', Array.from(this.expandedCategories)); // Debug log
    this.cdr.detectChanges(); // Manually trigger change detection
  }

  isExpanded(categoryId: number): boolean {
    return this.expandedCategories.has(categoryId);
  }

  hasChildren(category: Category | undefined): boolean {
    return !!category && Array.isArray(category.children) && category.children.length > 0;
  }

  trackByFn(index: number, item: Category): number {
    return item.id;
  }
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsPageComponent } from './Components/products-page/products-page.component';
import { HomeViewComponent } from './Components/home-view/home-view.component';
import { WishListsComponent } from './Components/wish-lists/wish-lists.component';
import { BagItemsComponent } from './Components/bag-items/bag-items.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { ProductsByCategoriesComponent } from './Components/products-by-categories/products-by-categories.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsPageComponent
  },
  {
    path: 'all-products', component: AllProductsComponent
  },
  {
    path: 'view-product/:id', component: ViewProductComponent
  },
  {
    path: '', component: HomeViewComponent
  },
  {
    path: 'wishlist', component: WishListsComponent
  },{
    path: 'bagItem', component: BagItemsComponent
  },
  {
    path:'product-by-category/:id', component: ProductsByCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Injectable } from '@angular/core';
import { ServiceService } from './service.service';
import { of, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  whishlistedItems: any[] = [];
  allBagItems: any[] = [];
  allWishListProducts: any[] = [];
  allProductsData: any[] = [];

  constructor(public service: ServiceService) { }

  callAllWishlistItems() {
    if (typeof window === 'undefined') return of([]);
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return of([]);
    }
    const userId = JSON.parse(userData).id;
    return this.service.getWishListItems(userId).pipe(
      tap((res: any) => {
        this.allWishListProducts = res;
      }),
      catchError(err => {
        console.error('Wishlist error:', err);
        return of([]);
      })
    );
  }

  getAllProductsData() {
    return this.service.getAllProductsData().pipe(
      tap((res: any) => {
        this.allProductsData = res;
      }),
      catchError(err => {
        console.error('Products error:', err);
        return of([]);
      })
    );
  }

  getWishListItemsLength() {
    if (typeof window === 'undefined') return of([]);
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return of([]);
    }
    const userId = JSON.parse(userData).id;
    return this.service.getWishListItems(userId).pipe(
      tap((res: any) => {
        this.whishlistedItems = [];
        res.forEach((item: any) => {
          this.whishlistedItems.push(item?.productId);
        });
      }),
      catchError(err => {
        console.error('Wishlist length error:', err);
        return of([]);
      })
    );
  }

  getAllBagItemsLength() {
    if (typeof window === 'undefined') return of([]);
    const userData = localStorage.getItem('userData');
    if (!userData) {
      return of([]);
    }
    const userId = JSON.parse(userData).id;
    return this.service.getAllBagItems(userId).pipe(
      tap((res: any) => {
        this.allBagItems = res;
      }),
      catchError(err => {
        console.error('Bag items error:', err);
        return of([]);
      })
    );
  }
}
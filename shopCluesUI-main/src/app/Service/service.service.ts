import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';
import { map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getCategories(headerName: any) {
    let url = environment.apiBaseUrl + 'categories/' + encodeURIComponent(headerName);
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getCategories error:', err);
        return of([]);
      })
    );
  }

  getDataBasedOnHeaderAndSubCategory(headerName: any, subCategory: any) {
    let url = environment.apiBaseUrl + encodeURIComponent(headerName) + '/' + subCategory;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getDataBasedOnHeaderAndSubCategory error:', err);
        return of([]);
      })
    );
  }

  loginUser(obj: any) {
    let url = environment.apiBaseUrl + 'login';
    return this.http.post(url, obj).pipe(
      catchError(err => {
        console.error('loginUser error:', err);
        return of(null);
      })
    );
  }

  registerUser(obj: any) {
    let url = environment.apiBaseUrl + 'register';
    return this.http.post(url, obj).pipe(
      catchError(err => {
        console.error('registerUser error:', err);
        return of(null);
      })
    );
  }

  //same admin wala
  // addCategories(data:any){
  //   let url = environment.apiBaseUrl + '/addCategories';
  //   return this.http.post(url, data).pipe(
  //     catchError(err => {
  //       console.error('addCategories error:', err);
  //       return of(null);
  //     })
  //   );
  // }

  addProducts(formData: FormData) {
    let url = environment.apiBaseUrl + 'addProductDetailsInSubCategoryProductItems';
    return this.http.post(url, formData).pipe(
      catchError(err => {
        console.error('addProducts error:', err);
        return of(null);
      })
    );
  }

  addToWishList(userId: number, productId: number) {
    let url = environment.apiBaseUrl + 'wishlist/add?userId=' + userId + '&productId=' + productId;
    return this.http.post(url, {}).pipe(
      catchError(err => {
        console.error('addToWishList error:', err);
        return of(null);
      })
    );
  }

  getWishListItems(userId: number) {
    let url = environment.apiBaseUrl + 'wishlist/' + userId;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getWishListItems error:', err);
        return of([]);
      })
    );
  }

  deleteItemFromWishList(productId: any) {
    let url = environment.apiBaseUrl + 'wishlist/delete/' + productId;
    return this.http.post(url, {}, { responseType: 'text' }).pipe(
      map((res: any) => res),
      catchError(err => {
        console.error('deleteItemFromWishList error:', err);
        return of(null);
      })
    );
  }

  getAllProductsData() {
    let url = environment.apiBaseUrl + 'categories';
    return this.http.get<any[]>(url).pipe(
      catchError(err => {
        console.error('getAllProductsData error:', err);
        return of([]);
      })
    );
  }

  getAllBagItems(userId: number) {
    let url = environment.apiBaseUrl + 'addToBag/' + userId;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getAllBagItems error:', err);
        return of([]);
      })
    );
  }

  addItemToBag(userId: number, productId: number, size: any) {
    let url = environment.apiBaseUrl + 'addToBag/addItemToBag?size=' + size + '&userId=' + userId + '&productId=' + productId;
    return this.http.post(url, {}).pipe(
      catchError(err => {
        console.error('addItemToBag error:', err);
        return of(null);
      })
    );
  }

  deleteBagItemByProductId(productId: any) {
    let url = environment.apiBaseUrl + 'addToBag/' + productId;
    return this.http.post(url, {}, { responseType: 'text' }).pipe(
      catchError(err => {
        console.error('deleteBagItemByProductId error:', err);
        return of(null);
      })
    );
  }

  postOrderDataToOrderTable(obj: any) {
    let url = environment.apiBaseUrl + 'createOrder';
    return this.http.post(url, obj).pipe(
      catchError(err => {
        console.error('postOrderDataToOrderTable error:', err);
        return of(null);
      })
    );
  }

  verifyPayment(payload: any) {
    let url = environment.apiBaseUrl + 'paymentCallback';
    return this.http.post(url, payload, { responseType: 'text' }).pipe(
      catchError(err => {
        console.error('verifyPayment error:', err);
        return of(null);
      })
    );
  }

  addUserAddress(userId:any, obj:any){
    let url = environment.apiBaseUrl + 'addAddress/' + userId;
    return this.http.post(url, obj).pipe(
      catchError(err => {
        console.error('addUserAddress error:', err);
        return of(null);
      })
    );
  }

  getUserAddress(userId:any){
    let url = environment.apiBaseUrl + 'getAddress/' + userId;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getUserAddress error:', err);
        return of([]);
      })
    );
  }

  deleteAddress(addressId:any){
    let url = environment.apiBaseUrl + 'deleteAddress/' + addressId;
    return this.http.post(url, {}, {responseType: 'text'}).pipe(
      catchError(err => {
        console.error('deleteAddress error:', err);
        return of(null);
      })
    );
  }

  getAllOrdersData(){
    let url = environment.apiBaseUrl + 'getOrderData'
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getAllOrdersData error:', err);
        return of([]);
      })
    );
  }

  getAllProducts() {
    let url = environment.apiBaseUrl + 'products/allProducts';
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getAllProducts error:', err);
        return of([]);
      })
    );
  }

  getProductById(productId: string) {
    let url = environment.apiBaseUrl + 'products/' + productId;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getProductById error:', err);
        return of(null);
      })
    );
  }

  getCart(userId: number) {
    let url = environment.apiBaseUrl + `cart?userId=${userId}` ;
    return this.http.get(url).pipe(
      catchError(err => {
        console.error('getCart error:', err);
        return of([]);
      })
    );
  }

  addToCart(userId: number, productId: number, quantity: number, action: string) {
  const url = `${environment.apiBaseUrl}cart/${action}?userId=${userId}&productId=${productId}&quantity=${quantity}`;
  return this.http.post(url, {}).pipe(
    catchError(err => {
      console.error('addToCart error:', err);
      return of(null);
    })
  );
}
removeFromCart(userId: number, productId: number, quantity: number) {
  const url = `${environment.apiBaseUrl}cart/remove?userId=${userId}&productId=${productId}&quantity=${quantity}`;
  return this.http.put(url, {}).pipe(
    catchError(err => {
      console.error('removeFromCart error:', err);
      return of(null);
    })
  );
}

getProductsByCategory(categoryId: string) {
  const url = `${environment.apiBaseUrl}products?categoryId=${categoryId}`;
  return this.http.get(url).pipe(
    catchError(err => {
      console.error('getProductsByCategory error:', err);
      return of([]);
    })
  );
}


removeCartItem(userId: number, productId: number) {
  const url = `${environment.apiBaseUrl}cart/deleteItem?userId=${userId}&productId=${productId}`;
  return this.http.delete(url).pipe(
    catchError(err => {
      console.error('removeFromCart error:', err);
      return of(null);
    })
  );
}

}
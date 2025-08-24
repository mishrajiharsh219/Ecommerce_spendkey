import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ServiceService } from './Service/service.service';
import { SharedServiceService } from './Service/shared-service.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  isAdminOrUser:boolean = false;
 isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public service: ServiceService, public sharedService: SharedServiceService){
     this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
     if (this.isBrowser) {
      // Your initialization code here
      console.log('Running in browser');
    }
   if (typeof window !== 'undefined') {
      this.callAllWishlistItems();
    }
  }
  
  callAllWishlistItems(){
     if (typeof window !== 'undefined') {
      this.sharedService.getWishListItemsLength();
      this.sharedService.getAllBagItemsLength();
      this.sharedService.getAllBagItemsLength().subscribe((res:any)=>{})
      this.isUserOrAdmin();
    }
  }

  isUserOrAdmin(){
 if (typeof window === 'undefined') {
      return false;
    }
    const userData = localStorage.getItem('userData');
    if(!userData){
      return;
    }
    return JSON.parse(userData)?.userRole === 'Admin';
  }
}

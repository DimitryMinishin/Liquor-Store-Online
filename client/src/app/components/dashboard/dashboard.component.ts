import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/CartServise';
import { SharedService } from '../services/SharedService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, DoCheck {
  public itemsNumber: number = 0;
  public loginName: string = '';
  public currentUserId: number = 0;
  public isLoggedIn: boolean = false;
  public loginNameInStorage: string = '';
  onCartClicked() {
    this.router.navigate(['/cart']);
  }
  constructor(
    public cartService: CartService,
    private router: Router,
    public sharedService: SharedService,
    public userService: UserService
  ) {
    this.itemsNumber = +localStorage.getItem('ItemsNumber');
  }

  ngDoCheck(): void {
    this.cartService.listen().subscribe((m: any) => {
      console.log(m);
      this.cartService.getProducts().subscribe((res) => {
        this.itemsNumber = res.length;
      });
    });
    this.loginNameInStorage = localStorage.getItem('CustomerName');
    if (this.loginNameInStorage != null) {
      this.loginName = localStorage.getItem('CustomerName');
      this.itemsNumber = +localStorage.getItem('ItemsNumber');
      this.userService.setSharedIsLoggedIn(true);
    }
  }

  onLoginClicked() {
    this.router.navigate(['/login']);
  }

  onLogoutClicked() {
    localStorage.clear();
    sessionStorage.clear();
    this.sharedService.nextMessage('Guest');
    this.userService.setSharedIsLoggedIn(false);
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.loginName = localStorage.getItem('CustomerName');
    this.sharedService.sharedMessage.subscribe(
      (message) => (this.loginName = message)
    );
    this.userService.isLoggedIn.subscribe(
      (message) => (this.isLoggedIn = message)
    );
    this.cartService.getProducts().subscribe((res) => {
      this.itemsNumber = res.length;
    });
  }
}

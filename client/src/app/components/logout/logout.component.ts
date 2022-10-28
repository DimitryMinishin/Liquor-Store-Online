import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/CartServise';
import { SharedService } from '../services/SharedService';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  public loginName: string = '';

  constructor(private router: Router, private sharedService: SharedService, private userService:UserService, private cartService: CartService) {}

  public onCancelClicked() {
    this.router.navigate(['/main']);
  }

  public onLogoutClicked() {

    localStorage.clear();
    sessionStorage.clear();
    this.sharedService.nextMessage('Guest');
    this.userService.setSharedIsLoggedIn(false);
    this.cartService.clearCartItemsList();
    this.router.navigate(['/home']);
    this.cartService.filter('Register click');
  }
}

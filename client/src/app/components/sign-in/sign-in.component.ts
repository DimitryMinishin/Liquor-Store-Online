import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import INewUser from '../models/INewUser';
import { UserService } from '../../../app/components/services/UserService';
import { Router } from '@angular/router';
import IShoppingCard from '../models/IShoppingCard';
import { ShoppingCardService } from '../services/ShoppingCardService';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public userDetails: FormGroup;
  public addressDetails: FormGroup;
  public cities: string[] = ['Ashdod', 'Ashkelon', 'Bat Yam', 'Rishon LeZion', 'Bnei Brak', 'Modiin', 'Holon', 'Herzliya', 'Raanana', 'Kfar Saba', 'Nazareth', 'Rehovot', 'Givatayim', 'Hadera', 'Beersheba', 'Tiberias', 'Eilat', 'Afula', 'Kiryat Shmona', 'Kiryat Ata', 'Kiryat Yam', 'Kiryat Bialik', 'Kiryat Motzkin', 'Kiryat Ono', 'Kiryat Gat', 'Kiryat Malakhi', 'Kiryat Tivon', 'Kiryat Haim', 'Kiryat Ekron', 'Kiryat Arba', 'Kiryat Anavim', 'Kiryat Bialik', 'Kiryat Gat', 'Kiryat Malakhi', 'Kiryat Motzkin', 'Kiryat Ono', 'Kiryat Shmona', 'Kiryat Yam', 'Kiryat Tivon', 'Kiryat Haim', 'Kiryat Ekron', 'Kiryat Arba', 'Kiryat Anavim', 'Kiryat Bialik', 'Kiryat Gat', 'Kiryat Malakhi', 'Kiryat Motzkin', 'Kiryat Ono', 'Kiryat Shmona', 'Kiryat Yam', 'Kiryat Tivon', 'Kiryat Haim', 'Kiryat Ekron', 'Kiryat Arba', 'Kiryat Anavim', 'Kiryat Bialik', 'Kiryat Gat', 'Kiryat Malakhi', 'Kiryat Motzkin', 'Kiryat Ono', 'Kiryat Shmona', 'Kiryat Yam', 'Kiryat Tivon', 'Kiryat Haim', 'Kiryat Ekron', 'Kiryat Arba', 'Kiryat Anavim', 'Kiryat Bialik', 'Kiryat Gat', 'Kiryat Malakhi', 'Kiryat Motzkin', 'Kiryat Ono',  ];
  public newUser: INewUser;
  public newShoppingCard: IShoppingCard;

  constructor(private builder: FormBuilder,private userService: UserService, private shoppingCardService: ShoppingCardService, private router: Router) {
    this.userDetails = this.builder.group({
      id: ['', [Validators.required, Validators.minLength(9)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [Validators.required, Validators.minLength(8)]
    });
    this.addressDetails = this.builder.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      houseNumber: ['', [Validators.required, Validators.minLength(1)]],
      phone: ['', [Validators.required, Validators.minLength(9)]],
    });
  }

  public onSubmitClicked(): void {
    this.newUser = {
      id: this.userDetails.get('id').value,
      firstName: this.userDetails.get('firstName').value,
      lastName: this.userDetails.get('lastName').value,
      email: this.userDetails.get('email').value,
      password: this.userDetails.get('password').value,
      city: this.addressDetails.get('city').value,
      street: this.addressDetails.get('street').value,
      houseNumber: this.addressDetails.get('houseNumber').value,
      phone: this.addressDetails.get('phone').value,
      userType: 'customer',

    };
    this.createNewUser(this.newUser);
    const registrationDate = new Date();
    this.newShoppingCard = {
      customerId: this.userDetails.get('id').value,
      createdDate: registrationDate,
      };
}

public createNewUser(newUser: INewUser): void {
  const observable = this.userService.createUser(newUser);
  observable.subscribe(() => {
this.router.navigate(['/login']);
});
}

public createNewShoppingCart(newShoppingCart: IShoppingCard ): void {
  const observable = this.shoppingCardService.createNewShoppingCart(newShoppingCart);
  observable.subscribe(() => {
this.router.navigate(['/main']);
});
}


  get id(): any {
    return this.userDetails.get('id');
  }
  get firstName(): any {
    return this.userDetails.get('firstName');
  }
  get lastName(): any {
    return this.userDetails.get('lastName');
  }
  get email(): any {
    return this.userDetails.get('email');
  }
  get password(): any {
    return this.userDetails.get('password');
  }
  get confirmPassword(): any {
    return this.userDetails.get('confirmPassword');
  }
  get city(): any {
    return this.addressDetails.get('city');
  }
  get street(): any {
    return this.addressDetails.get('street');
  }
  get houseNumber(): any {

    return this.addressDetails.get('houseNumber');
  }
  get phone(): any {

    return this.addressDetails.get('phone');
  }


  ngOnInit(): void {}
}

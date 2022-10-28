import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginDetails } from '../models/UserLoginDetails';
import { SuccessfulLoginServerResponse } from '../models/SuccessfulLoginServerResponse';
import INewUser from '../models/INewUser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public customerId = new BehaviorSubject(0);
  public isLoggedIn = new BehaviorSubject(false);
  sharedcustomerId = this.customerId.asObservable();


  constructor(private http: HttpClient) {}

  setSharedCustomerId(id: number) {
    this.customerId.next(id);
  }


  public login(
    userLoginDetails: UserLoginDetails
  ): Observable<SuccessfulLoginServerResponse> {
    return this.http.post<SuccessfulLoginServerResponse>(
      'http://localhost:3001/users/login',
      userLoginDetails
    );
  }

  public createUser(newUser: INewUser): Observable<void> {
    return this.http.post<void>('http://localhost:3001/users/', newUser);
  }

  public getUserDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/users/details');
  }

public setSharedIsLoggedIn(isLoggedIn: boolean) {
    this.isLoggedIn.next(isLoggedIn);
  }

}



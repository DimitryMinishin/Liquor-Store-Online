import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private loginName = new BehaviorSubject('Guest');
  sharedMessage = this.loginName.asObservable();

  constructor() {}

  nextMessage(message: string) {
    this.loginName.next(message);
  }
}

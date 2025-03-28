import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../models/users/UserDto';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  // These are the data for the service containing the user subject and key for local storage
  private userSubject = new BehaviorSubject<UserDto | undefined>(undefined);
  private USER_DATA_KEY = 'USER_DATA';
  userSubject$ = this.userSubject.asObservable();

  // Injecting the required dependencies
  constructor() {
    this.userSubject.next(this.getUserFromLocal());
  }

  // Getters
  getUser() {
    const userData = this.getUserFromLocal();
    return userData ? { ...userData } : undefined;
  }

  // This function fetches the user data from the local storage
  private getUserFromLocal(): UserDto | undefined {
    const data = localStorage.getItem(this.USER_DATA_KEY);
    return data ? JSON.parse(data) : undefined;
  }

  // This function sets the user data to the local storage
  setUserToLocal(user: UserDto) {
    localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { UserDto } from '../../../api/users/user.dto';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly storageKey = 'prpo.auth.user';
  private readonly userSubject = new BehaviorSubject<UserDto | null>(null);
  readonly user$ = this.userSubject.asObservable();
  readonly isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor() {
    const saved = this.loadFromStorage();
    if (saved) {
      this.userSubject.next(saved);
    }
  }

  setUser(user: UserDto) {
    this.userSubject.next(user);
    this.saveToStorage(user);
  }

  clear() {
    this.userSubject.next(null);
    this.clearStorage();
  }

  get snapshot(): UserDto | null {
    return this.userSubject.value;
  }

  private loadFromStorage(): UserDto | null {
    try {
      if (typeof localStorage === 'undefined') {
        return null;
      }
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as UserDto) : null;
    } catch {
      return null;
    }
  }

  private saveToStorage(user: UserDto) {
    try {
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } catch {
      // ignore storage errors in non-browser environments
    }
  }

  private clearStorage() {
    try {
      if (typeof localStorage === 'undefined') {
        return;
      }
      localStorage.removeItem(this.storageKey);
    } catch {
      // ignore storage errors in non-browser environments
    }
  }
}

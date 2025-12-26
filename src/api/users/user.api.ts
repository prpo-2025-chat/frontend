import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import { LoginRequest, RegisterRequest, UserDto } from './user.dto';

@Injectable({ providedIn: 'root' })
export class UserApi {
  constructor(private http: HttpClient) {}

  register(payload: RegisterRequest): Observable<UserDto> {
    return this.http.post<UserDto>(apiUrl('user', '/register'), payload);
  }

  login(payload: LoginRequest): Observable<UserDto> {
    return this.http.post<UserDto>(apiUrl('user', '/login'), payload);
  }

  hello(): Observable<string> {
    return this.http.get<string>(apiUrl('user', '/hello'), { responseType: 'text' as 'json' });
  }
}

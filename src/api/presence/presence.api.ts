import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import { PresenceDto } from './presence.dto';

@Injectable({ providedIn: 'root' })
export class PresenceApi {
  constructor(private http: HttpClient) {}

  getPresence(userId: string): Observable<PresenceDto> {
    return this.http.get<PresenceDto>(apiUrl('presence', `/${userId}`));
  }

  setOnline(userId: string): Observable<PresenceDto> {
    return this.http.put<PresenceDto>(apiUrl('presence', `/${userId}/online`), {});
  }

  setOffline(userId: string): Observable<PresenceDto> {
    return this.http.put<PresenceDto>(apiUrl('presence', `/${userId}/offline`), {});
  }

  getBulkPresence(userIds: string[]): Observable<PresenceDto[]> {
    let params = new HttpParams();
    userIds.forEach((id) => {
      params = params.append('userIds', id);
    });
    return this.http.get<PresenceDto[]>(apiUrl('presence', '/bulk'), { params });
  }

  getAllPresence(): Observable<PresenceDto[]> {
    return this.http.get<PresenceDto[]>(apiUrl('presence', '/all'));
  }
}

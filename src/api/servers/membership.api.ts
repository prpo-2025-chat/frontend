import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import { Membership, MembershipRole } from './membership.dto';
import { Server, ServerType } from './server.dto';

@Injectable({ providedIn: 'root' })
export class MembershipApi {
  constructor(private http: HttpClient) {}

  getUsers(serverId: string): Observable<string[]> {
    const headers = new HttpHeaders().set('Server-Id', serverId);
    return this.http.get<string[]>(apiUrl('membership', '/users'), { headers });
  }

  getServers(userId: string, serverType?: ServerType): Observable<Server[]> {
    let params = new HttpParams();
    if (serverType) {
      params = params.set('type', serverType);
    }
    return this.http.get<Server[]>(apiUrl('membership', `/${userId}/servers`), { params });
  }

  addMember(userId: string, serverId: string): Observable<void> {
    const headers = new HttpHeaders().set('User-Id', userId).set('Server-Id', serverId);
    return this.http.post<void>(apiUrl('membership'), {}, { headers });
  }

  removeMember(callerUserId: string, targetUserId: string, serverId: string): Observable<void> {
    const headers = new HttpHeaders()
      .set('Caller-User-Id', callerUserId)
      .set('Target-User-Id', targetUserId)
      .set('Server-Id', serverId);
    return this.http.delete<void>(apiUrl('membership'), { headers });
  }

  banMember(callerUserId: string, targetUserId: string, serverId: string): Observable<void> {
    const headers = new HttpHeaders()
      .set('Caller-User-Id', callerUserId)
      .set('Target-User-Id', targetUserId)
      .set('Server-Id', serverId);
    return this.http.delete<void>(apiUrl('membership', '/ban'), { headers });
  }

  changeRole(
    callerUserId: string,
    targetUserId: string,
    serverId: string,
    role: MembershipRole
  ): Observable<void> {
    const headers = new HttpHeaders()
      .set('Caller-User-Id', callerUserId)
      .set('Target-User-Id', targetUserId)
      .set('Server-Id', serverId)
      .set('Role', role);
    return this.http.patch<void>(apiUrl('membership'), {}, { headers });
  }

  getMembership(userId: string, serverId: string): Observable<Membership> {
    const headers = new HttpHeaders().set('Server-Id', serverId);
    return this.http.get<Membership>(apiUrl('membership', `/${userId}`), { headers });
  }
}

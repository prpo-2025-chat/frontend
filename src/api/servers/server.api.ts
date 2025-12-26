import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import { Server, ServerCreateRequest } from './server.dto';

@Injectable({ providedIn: 'root' })
export class ServerApi {
  constructor(private http: HttpClient) {}

  createServer(payload: ServerCreateRequest, creatorId: string, userId?: string): Observable<Server> {
    let headers = new HttpHeaders().set('Creator-Id', creatorId);
    if (userId) {
      headers = headers.set('User-Id', userId);
    }
    return this.http.post<Server>(apiUrl('server'), payload, { headers });
  }

  getServer(id: string): Observable<Server> {
    return this.http.get<Server>(apiUrl('server', `/${id}`));
  }

  deleteServer(id: string, callerUserId: string): Observable<void> {
    const headers = new HttpHeaders().set('Caller-Id', callerUserId);
    return this.http.delete<void>(apiUrl('server', `/${id}`), { headers });
  }

  hello(): Observable<string> {
    return this.http.get<string>(apiUrl('server', '/hello'), { responseType: 'text' as 'json' });
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import {
  MessageReceivedNotificationRequest,
  NotificationResponse,
  NotificationStatus
} from './notification.dto';

@Injectable({ providedIn: 'root' })
export class NotificationApi {
  constructor(private http: HttpClient) {}

  getNotifications(userId: string, status?: NotificationStatus): Observable<NotificationResponse[]> {
    let params = new HttpParams().set('userId', userId);
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<NotificationResponse[]>(apiUrl('notification'), { params });
  }

  markAsRead(id: string, userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.patch<void>(apiUrl('notification', `/${id}/read`), null, { params });
  }

  sendMessageReceived(payload: MessageReceivedNotificationRequest): Observable<void> {
    return this.http.post<void>(apiUrl('internalNotification', '/message-received'), payload);
  }
}

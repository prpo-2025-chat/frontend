import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import { MediaDto, MediaType } from './media.dto';

@Injectable({ providedIn: 'root' })
export class MediaApi {
  constructor(private http: HttpClient) {}

  upload(file: File, uploaderId: string, mediaType: MediaType): Observable<MediaDto> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploaderId', uploaderId);
    formData.append('mediaType', mediaType);
    return this.http.post<MediaDto>(apiUrl('media', '/upload'), formData);
  }

  download(id: string): Observable<Blob> {
    return this.http.get<Blob>(apiUrl('media', `/${id}/download`), {
      responseType: 'blob' as 'json'
    });
  }

  getById(id: string): Observable<MediaDto> {
    return this.http.get<MediaDto>(apiUrl('media', `/${id}`));
  }

  getByUploader(uploaderId: string): Observable<MediaDto[]> {
    return this.http.get<MediaDto[]>(apiUrl('media', `/uploader/${uploaderId}`));
  }

  getByType(mediaType: MediaType): Observable<MediaDto[]> {
    return this.http.get<MediaDto[]>(apiUrl('media', `/type/${mediaType}`));
  }

  getAll(): Observable<MediaDto[]> {
    return this.http.get<MediaDto[]>(apiUrl('media', '/all'));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(apiUrl('media', `/${id}`));
  }
}

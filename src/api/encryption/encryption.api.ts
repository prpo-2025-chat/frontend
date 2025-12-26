import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { apiUrl } from '../base-urls';
import { FileEncryptionDto, PasswordHashDto } from './encryption.dto';

@Injectable({ providedIn: 'root' })
export class EncryptionApi {
  constructor(private http: HttpClient) {}

  encryptMessage(plainText: string): Observable<string> {
    return this.http.post<string>(apiUrl('encryption'), plainText, {
      responseType: 'text' as 'json'
    });
  }

  decryptMessage(cipherText: string): Observable<string> {
    return this.http.post<string>(apiUrl('encryption', '/decryption'), cipherText, {
      responseType: 'text' as 'json'
    });
  }

  decryptBatch(cipherTexts: string[]): Observable<string[]> {
    return this.http.post<string[]>(apiUrl('encryption', '/decryption/batch'), cipherTexts);
  }

  encryptFile(file: File): Observable<FileEncryptionDto> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileEncryptionDto>(apiUrl('encryption', '/file'), formData);
  }

  decryptFile(payload: FileEncryptionDto): Observable<Blob> {
    return this.http.post<Blob>(apiUrl('encryption', '/decryption/file'), payload, {
      responseType: 'blob' as 'json'
    });
  }

  hashPassword(payload: PasswordHashDto): Observable<PasswordHashDto> {
    return this.http.post<PasswordHashDto>(apiUrl('password'), payload);
  }

  validatePassword(payload: PasswordHashDto): Observable<boolean> {
    return this.http.post<boolean>(apiUrl('password', '/validation'), payload);
  }
}

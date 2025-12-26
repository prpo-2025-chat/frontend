import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'error' | 'info' | 'success';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSubject = new BehaviorSubject<Toast[]>([]);
  readonly toasts$ = this.toastsSubject.asObservable();
  private counter = 0;

  error(message: string) {
    this.push(message, 'error');
  }

  info(message: string) {
    this.push(message, 'info');
  }

  success(message: string) {
    this.push(message, 'success');
  }

  dismiss(id: number) {
    this.toastsSubject.next(this.toastsSubject.value.filter((t) => t.id !== id));
  }

  private push(message: string, type: ToastType) {
    const toast: Toast = { id: ++this.counter, message, type };
    this.toastsSubject.next([...this.toastsSubject.value, toast]);
    setTimeout(() => this.dismiss(toast.id), 3500);
  }
}

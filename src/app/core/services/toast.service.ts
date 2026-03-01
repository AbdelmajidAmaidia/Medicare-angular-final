import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'info' | 'warning' | 'danger';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  timeoutMs?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts$ = new BehaviorSubject<ToastMessage[]>([]);
  readonly toasts$ = this._toasts$.asObservable();

  show(toast: Omit<ToastMessage, 'id'>) {
    const id = crypto.randomUUID();
    const next: ToastMessage = { id, timeoutMs: 3500, ...toast };
    this._toasts$.next([...this._toasts$.value, next]);

    if (next.timeoutMs && next.timeoutMs > 0) {
      window.setTimeout(() => this.dismiss(id), next.timeoutMs);
    }
  }

  dismiss(id: string) {
    this._toasts$.next(this._toasts$.value.filter(t => t.id !== id));
  }

  clear() {
    this._toasts$.next([]);
  }
}
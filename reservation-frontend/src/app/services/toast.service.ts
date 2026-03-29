import { Injectable, signal } from '@angular/core';

export type ToastVariant = 'error';

export interface ToastPayload {
  message: string;
  variant: ToastVariant;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toast = signal<ToastPayload | null>(null);
  private hideTimer: ReturnType<typeof setTimeout> | undefined;

  /** Estado actual del toast (solo lectura para plantillas). */
  readonly toast = this._toast.asReadonly();

  showError(message: string): void {
    if (this.hideTimer !== undefined) {
      clearTimeout(this.hideTimer);
    }
    this._toast.set({ message, variant: 'error' });
    this.hideTimer = setTimeout(() => this.dismiss(), 8000);
  }

  dismiss(): void {
    if (this.hideTimer !== undefined) {
      clearTimeout(this.hideTimer);
      this.hideTimer = undefined;
    }
    this._toast.set(null);
  }
}

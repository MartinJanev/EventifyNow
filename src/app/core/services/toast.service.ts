import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$: Observable<Toast[]> = this.toastsSubject.asObservable();

  /**
   * Show a success toast notification
   */
  showSuccess(message: string, duration: number = 1500): void {
    this.addToast(message, 'success', duration);
    this.showToast(message, duration, '#0042B6');
  }

  /**
   * Show an error toast notification
   */
  showError(message: string, duration: number = 2000): void {
    this.addToast(message, 'error', duration);
    this.showToast(message, duration, '#d9534f');
  }

  /**
   * Alias for showError
   */
  error(message: string, duration: number = 2000): void {
    this.showError(message, duration);
  }

  /**
   * Add a toast to the observable stream
   */
  private addToast(message: string, type: 'success' | 'error' | 'info', duration: number): void {
    const toast: Toast = {
      id: Date.now().toString(),
      message,
      type
    };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    setTimeout(() => {
      this.dismiss(toast.id);
    }, duration);
  }

  /**
   * Dismiss a toast by ID
   */
  dismiss(id: string): void {
    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next(currentToasts.filter(t => t.id !== id));
  }

  /**
   * Show a custom toast notification
   */
  private showToast(message: string, duration: number, color: string): void {
    const toast = document.createElement('div');
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.2s';
    toast.innerText = message;
    toast.style.position = 'fixed';
    toast.style.top = '10%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = '#fff';
    toast.style.padding = '40px';
    toast.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    toast.style.zIndex = '1000';
    toast.style.fontSize = '20px';
    toast.style.color = color;
    toast.style.fontWeight = 'bold';
    toast.style.borderRadius = '10px';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 200);
    }, duration);
  }
}

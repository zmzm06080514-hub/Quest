/**
 * 토스트 알림 관리 클래스
 */

import type { ToastType } from './types.js';

export class ToastManager {
  private toastContainer: HTMLElement | null;

  constructor() {
    this.toastContainer = document.getElementById('toast-container');
  }

  /**
   * 토스트 메시지 표시
   */
  public show(message: string, type: ToastType = 'info', duration: number = 3500): void {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    if (!this.toastContainer) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
      this.toastContainer = container;
    }

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /**
   * 성공 토스트
   */
  public success(message: string): void {
    this.show(message, 'success');
  }

  /**
   * 에러 토스트
   */
  public error(message: string): void {
    this.show(message, 'error');
  }

  /**
   * 정보 토스트
   */
  public info(message: string): void {
    this.show(message, 'info');
  }
}

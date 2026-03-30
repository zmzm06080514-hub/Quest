import { FORM_FIELD_IDS } from './types.js';

export class ModalManager {
  private modal: HTMLElement | null;
  private modalOverlay: HTMLElement | null;

  constructor() {
    this.modal = document.getElementById('modal');
    this.modalOverlay = document.getElementById('modal-overlay');
  }

  public open(): void {
    if (this.modal) {
      this.modal.classList.add('open');
      this.modalOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
      const firstInput = this.modal.querySelector('input');
      setTimeout(() => firstInput?.focus(), 100);
    }
  }

  public close(): void {
    if (this.modal) {
      this.modal.classList.remove('open');
      this.modalOverlay?.classList.remove('open');
      document.body.style.overflow = '';
      this.resetForm();
    }
  }

  public handleOverlayClick(e: MouseEvent): void {
    if (e.target === this.modalOverlay) {
      this.close();
    }
  }

  private resetForm(): void {
    const form = document.getElementById('f-contact') as HTMLFormElement | null;
    form?.reset();

    FORM_FIELD_IDS.forEach((id) => {
      const field = document.getElementById(id);
      const errorMsg = document.getElementById(`${id}-error`);
      field?.classList.remove('error');
      errorMsg?.classList.remove('show');
    });
  }

  public displayErrors(errors: { [key: string]: string }): void {
    FORM_FIELD_IDS.forEach((id) => {
      const field = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
      const errorMsg = document.getElementById(`${id}-error`);
      const key = id.replace('f-', '');

      if (errors[key]) {
        field?.classList.add('error');
        if (errorMsg) {
          errorMsg.textContent = errors[key];
          errorMsg.classList.add('show');
        }
        return;
      }

      field?.classList.remove('error');
      errorMsg?.classList.remove('show');
    });
  }

  public setSubmitButtonState(loading: boolean, text?: string): void {
    const submitBtn = document.getElementById('modal-submit') as HTMLButtonElement | null;
    if (submitBtn) {
      submitBtn.disabled = loading;
      if (text) {
        submitBtn.textContent = text;
      }
    }
  }
}

import { FormValidator } from './FormValidator.js';

export class PhoneInputManager {
  private phoneInput: HTMLInputElement | null;
  private validator: FormValidator;

  constructor() {
    this.phoneInput = document.getElementById('f-phone') as HTMLInputElement;
    this.validator = new FormValidator();
  }

  public initEventListener(): void {
    if (this.phoneInput) {
      this.phoneInput.addEventListener('input', () => this.handlePhoneInput());
    }
  }

  private handlePhoneInput(): void {
    if (!this.phoneInput) return;

    const sanitized = this.validator.sanitizePhoneNumber(this.phoneInput.value);
    this.phoneInput.value = this.validator.formatPhoneNumber(sanitized);

    const errorElement = document.getElementById('f-phone-error');
    if (sanitized.length > 0 && sanitized.length < 10) {
      this.phoneInput.classList.add('error');
      errorElement?.classList.add('show');
      return;
    }

    this.phoneInput.classList.remove('error');
    errorElement?.classList.remove('show');
  }
}

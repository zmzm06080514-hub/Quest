import { FormValidator } from './FormValidator.js';
export class PhoneInputManager {
    constructor() {
        this.phoneInput = document.getElementById('f-phone');
        this.validator = new FormValidator();
    }
    initEventListener() {
        if (this.phoneInput) {
            this.phoneInput.addEventListener('input', () => this.handlePhoneInput());
        }
    }
    handlePhoneInput() {
        if (!this.phoneInput)
            return;
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
//# sourceMappingURL=PhoneInputManager.js.map
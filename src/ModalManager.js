import { FORM_FIELD_IDS } from './types.js';
export class ModalManager {
    constructor() {
        this.modal = document.getElementById('modal');
        this.modalOverlay = document.getElementById('modal-overlay');
    }
    open() {
        if (this.modal) {
            this.modal.classList.add('open');
            this.modalOverlay?.classList.add('open');
            document.body.style.overflow = 'hidden';
            const firstInput = this.modal.querySelector('input');
            setTimeout(() => firstInput?.focus(), 100);
        }
    }
    close() {
        if (this.modal) {
            this.modal.classList.remove('open');
            this.modalOverlay?.classList.remove('open');
            document.body.style.overflow = '';
            this.resetForm();
        }
    }
    handleOverlayClick(e) {
        if (e.target === this.modalOverlay) {
            this.close();
        }
    }
    resetForm() {
        const form = document.getElementById('f-contact');
        form?.reset();
        FORM_FIELD_IDS.forEach((id) => {
            const field = document.getElementById(id);
            const errorMsg = document.getElementById(`${id}-error`);
            field?.classList.remove('error');
            errorMsg?.classList.remove('show');
        });
    }
    displayErrors(errors) {
        FORM_FIELD_IDS.forEach((id) => {
            const field = document.getElementById(id);
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
    setSubmitButtonState(loading, text) {
        const submitBtn = document.getElementById('modal-submit');
        if (submitBtn) {
            submitBtn.disabled = loading;
            if (text) {
                submitBtn.textContent = text;
            }
        }
    }
}
//# sourceMappingURL=ModalManager.js.map

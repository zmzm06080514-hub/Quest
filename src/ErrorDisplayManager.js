export class ErrorDisplayManager {
    resolveFieldId(fieldId) {
        return fieldId.startsWith('f-') ? fieldId : `f-${fieldId}`;
    }
    displayFieldError(fieldId, errorMessage) {
        const resolvedFieldId = this.resolveFieldId(fieldId);
        const errorElement = document.getElementById(`${resolvedFieldId}-error`);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
        const fieldElement = document.getElementById(resolvedFieldId);
        fieldElement?.classList.add('error');
    }
    clearFieldError(fieldId) {
        const resolvedFieldId = this.resolveFieldId(fieldId);
        const errorElement = document.getElementById(`${resolvedFieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        const fieldElement = document.getElementById(resolvedFieldId);
        fieldElement?.classList.remove('error');
    }
    clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-msg');
        errorElements.forEach((el) => {
            el.textContent = '';
            el.classList.remove('show');
        });
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach((el) => {
            el.classList.remove('error');
        });
    }
    displayMultipleErrors(errors) {
        this.clearAllErrors();
        Object.entries(errors).forEach(([fieldId, errorMessage]) => {
            this.displayFieldError(fieldId, errorMessage);
        });
    }
    attachFieldFocusHandler(fieldId) {
        const field = document.getElementById(this.resolveFieldId(fieldId));
        if (field) {
            field.addEventListener('focus', () => {
                this.clearFieldError(fieldId);
            });
        }
    }
    attachAllFieldFocusHandlers(fieldIds) {
        fieldIds.forEach((id) => this.attachFieldFocusHandler(id));
    }
}
//# sourceMappingURL=ErrorDisplayManager.js.map
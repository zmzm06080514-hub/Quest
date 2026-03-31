export class ErrorDisplayManager {
  private resolveFieldId(fieldId: string): string {
    return fieldId.startsWith('f-') ? fieldId : `f-${fieldId}`;
  }

  public displayFieldError(fieldId: string, errorMessage: string): void {
    const resolvedFieldId = this.resolveFieldId(fieldId);
    const errorElement = document.getElementById(`${resolvedFieldId}-error`);
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.classList.add('show');
    }

    const fieldElement = document.getElementById(resolvedFieldId) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    fieldElement?.classList.add('error');
  }

  public clearFieldError(fieldId: string): void {
    const resolvedFieldId = this.resolveFieldId(fieldId);
    const errorElement = document.getElementById(`${resolvedFieldId}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.classList.remove('show');
    }

    const fieldElement = document.getElementById(resolvedFieldId) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    fieldElement?.classList.remove('error');
  }

  public clearAllErrors(): void {
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

  public displayMultipleErrors(errors: { [key: string]: string }): void {
    this.clearAllErrors();
    Object.entries(errors).forEach(([fieldId, errorMessage]) => {
      this.displayFieldError(fieldId, errorMessage);
    });
  }

  public attachFieldFocusHandler(fieldId: string): void {
    const field = document.getElementById(this.resolveFieldId(fieldId));
    if (field) {
      field.addEventListener('focus', () => {
        this.clearFieldError(fieldId);
      });
    }
  }

  public attachAllFieldFocusHandlers(fieldIds: string[]): void {
    fieldIds.forEach((id) => this.attachFieldFocusHandler(id));
  }
}

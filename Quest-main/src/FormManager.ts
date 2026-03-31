import type { FormDataInterface, FormFieldId } from './types.js';
import { FORM_FIELD_IDS } from './types.js';

export class FormManager {
  public collectFormData(): FormDataInterface {
    return {
      name: this.getFieldValue('f-name'),
      phone: this.getFieldValue('f-phone'),
      subject: this.getFieldValue('f-subject'),
      message: this.getFieldValue('f-message'),
    };
  }

  public setFieldValue(fieldId: FormFieldId, value: string): void {
    const field = document.getElementById(fieldId) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (field) {
      field.value = value;
    }
  }

  public getFieldValue(fieldId: FormFieldId): string {
    const field = document.getElementById(fieldId) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    return field?.value || '';
  }

  public resetForm(): void {
    const form = document.getElementById('f-contact') as HTMLFormElement | null;
    form?.reset();
  }

  public clearField(fieldId: FormFieldId): void {
    this.setFieldValue(fieldId, '');
  }

  public clearAllFields(): void {
    FORM_FIELD_IDS.forEach((id) => this.clearField(id));
  }
}

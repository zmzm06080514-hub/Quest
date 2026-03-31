import { FORM_FIELD_IDS } from './types.js';
export class FormManager {
    collectFormData() {
        return {
            name: this.getFieldValue('f-name'),
            phone: this.getFieldValue('f-phone'),
            subject: this.getFieldValue('f-subject'),
            message: this.getFieldValue('f-message'),
        };
    }
    setFieldValue(fieldId, value) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = value;
        }
    }
    getFieldValue(fieldId) {
        const field = document.getElementById(fieldId);
        return field?.value || '';
    }
    resetForm() {
        const form = document.getElementById('f-contact');
        form?.reset();
    }
    clearField(fieldId) {
        this.setFieldValue(fieldId, '');
    }
    clearAllFields() {
        FORM_FIELD_IDS.forEach((id) => this.clearField(id));
    }
}
//# sourceMappingURL=FormManager.js.map

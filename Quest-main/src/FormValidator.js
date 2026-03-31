import { PhoneValidator } from './PhoneValidator.js';
import { FieldValidator } from './FieldValidator.js';
export class FormValidator {
    constructor() {
        this.phoneValidator = new PhoneValidator();
        this.fieldValidator = new FieldValidator();
    }
    validateForm(data) {
        const errors = {};
        const nameValidation = this.fieldValidator.validateRequired(data.name, '이름');
        if (!nameValidation.isValid) {
            errors.name = nameValidation.message || '이름을 입력해주세요.';
        }
        const phoneValidation = this.phoneValidator.validate(data.phone);
        if (!phoneValidation.isValid) {
            errors.phone = phoneValidation.message || '연락처를 입력해주세요.';
        }
        const subjectValidation = this.fieldValidator.validateRequired(data.subject, '주제');
        if (!subjectValidation.isValid) {
            errors.subject = subjectValidation.message || '주제를 입력해주세요.';
        }
        const messageMinValidation = this.fieldValidator.validateMinLength(data.message, 10, '요청사항');
        if (!messageMinValidation.isValid) {
            errors.message = messageMinValidation.message || '요청사항을 10자 이상 입력해주세요.';
        }
        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }
    formatPhoneNumber(phone) {
        return this.phoneValidator.format(phone);
    }
    sanitizePhoneNumber(phone) {
        return this.phoneValidator.sanitize(phone);
    }
}
//# sourceMappingURL=FormValidator.js.map
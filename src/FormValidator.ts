import type { FormDataInterface, ValidationResult } from './types.js';
import { PhoneValidator } from './PhoneValidator.js';
import { FieldValidator } from './FieldValidator.js';

export class FormValidator {
  private phoneValidator: PhoneValidator;
  private fieldValidator: FieldValidator;

  constructor() {
    this.phoneValidator = new PhoneValidator();
    this.fieldValidator = new FieldValidator();
  }

  public validateForm(data: FormDataInterface): ValidationResult {
    const errors: ValidationResult['errors'] = {};

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

    const messageValidation = this.fieldValidator.validateRequired(data.message, '추가 요청사항');
    if (!messageValidation.isValid) {
      errors.message = messageValidation.message || '추가 요청사항을 입력해주세요.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  public formatPhoneNumber(phone: string): string {
    return this.phoneValidator.format(phone);
  }

  public sanitizePhoneNumber(phone: string): string {
    return this.phoneValidator.sanitize(phone);
  }
}

export class FieldValidator {
    validateRequired(value, fieldName) {
        if (!value.trim()) {
            return { isValid: false, message: `${fieldName}을(를) 입력해주세요.` };
        }
        return { isValid: true };
    }
    validateMinLength(value, minLength, fieldName) {
        if (value.trim().length < minLength) {
            return { isValid: false, message: `${fieldName}은 최소 ${minLength}글자 이상이어야 합니다.` };
        }
        return { isValid: true };
    }
    validateMaxLength(value, maxLength, fieldName) {
        if (value.trim().length > maxLength) {
            return { isValid: false, message: `${fieldName}은 최대 ${maxLength}글자까지 입력 가능합니다.` };
        }
        return { isValid: true };
    }
}
//# sourceMappingURL=FieldValidator.js.map
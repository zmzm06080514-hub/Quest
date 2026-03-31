export class PhoneValidator {
    sanitize(phone) {
        return phone.replace(/[^0-9]/g, '').slice(0, 11);
    }
    format(phone) {
        const sanitized = this.sanitize(phone);
        if (sanitized.length <= 3)
            return sanitized;
        if (sanitized.length <= 7)
            return `${sanitized.slice(0, 3)}-${sanitized.slice(3)}`;
        return `${sanitized.slice(0, 3)}-${sanitized.slice(3, 7)}-${sanitized.slice(7)}`;
    }
    validate(phone) {
        const sanitized = this.sanitize(phone);
        if (!phone.trim()) {
            return { isValid: false, message: '전화번호를 입력해주세요.' };
        }
        if (sanitized.length < 10) {
            return { isValid: false, message: '유효한 전화번호를 입력해주세요.' };
        }
        return { isValid: true };
    }
}
//# sourceMappingURL=PhoneValidator.js.map
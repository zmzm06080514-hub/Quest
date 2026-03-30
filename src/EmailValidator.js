export class EmailValidator {
    validate(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            return { isValid: false, message: '이메일을 입력해주세요.' };
        }
        if (!emailRegex.test(email)) {
            return { isValid: false, message: '유효한 이메일을 입력해주세요.' };
        }
        return { isValid: true };
    }
}
//# sourceMappingURL=EmailValidator.js.map
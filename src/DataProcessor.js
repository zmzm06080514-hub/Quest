export class DataProcessor {
    static normalize(data) {
        return {
            name: this.processName(data.name),
            phone: this.processPhone(data.phone),
            subject: this.processSubject(data.subject),
            message: this.processMessage(data.message),
        };
    }
    static processName(name) {
        return name.trim().replace(/\s+/g, ' ').substring(0, 50);
    }
    static processPhone(phone) {
        return phone.replace(/[^0-9]/g, '');
    }
    static processSubject(subject) {
        return subject.trim().replace(/\s+/g, ' ').substring(0, 100);
    }
    static processMessage(message) {
        return message.trim().replace(/\s+/g, ' ').substring(0, 1000);
    }
    static toAPIFormat(data) {
        return {
            ...this.normalize(data),
            timestamp: new Date().toISOString(),
        };
    }
    static validate(data) {
        const errors = [];
        if (!data.name)
            errors.push('이름이 비어있습니다.');
        if (!data.phone)
            errors.push('연락처가 비어있습니다.');
        if (!data.subject)
            errors.push('주제가 비어있습니다.');
        if (!data.message)
            errors.push('요청사항이 비어있습니다.');
        return {
            isValid: errors.length === 0,
            errors,
        };
    }
    static hasChanged(previous, current) {
        return (previous.name !== current.name ||
            previous.phone !== current.phone ||
            previous.subject !== current.subject ||
            previous.message !== current.message);
    }
    static maskSensitiveData(data) {
        return {
            name: data.name.substring(0, 1) + '***',
            phone: data.phone.substring(0, 3) + '***',
            subject: data.subject.substring(0, 5) + '...',
            message: data.message.substring(0, 10) + '...',
        };
    }
}
//# sourceMappingURL=DataProcessor.js.map
import type { FormDataInterface } from './types.js';

export class DataProcessor {
  public static normalize(data: FormDataInterface): FormDataInterface {
    return {
      name: this.processName(data.name),
      phone: this.processPhone(data.phone),
      subject: this.processSubject(data.subject),
      message: this.processMessage(data.message),
    };
  }

  public static processName(name: string): string {
    return name.trim().replace(/\s+/g, ' ').substring(0, 50);
  }

  public static processPhone(phone: string): string {
    return phone.replace(/[^0-9]/g, '');
  }

  public static processSubject(subject: string): string {
    return subject.trim().replace(/\s+/g, ' ').substring(0, 100);
  }

  public static processMessage(message: string): string {
    return message.trim().replace(/\s+/g, ' ').substring(0, 1000);
  }

  public static toAPIFormat(data: FormDataInterface): FormDataInterface & { timestamp: string } {
    return {
      ...this.normalize(data),
      timestamp: new Date().toISOString(),
    };
  }

  public static validate(data: FormDataInterface): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.name) errors.push('이름이 비어 있습니다.');
    if (!data.phone) errors.push('연락처가 비어 있습니다.');
    if (!data.subject) errors.push('주제가 비어 있습니다.');
    if (!data.message) errors.push('추가 요청사항이 비어 있습니다.');

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public static hasChanged(
    previous: FormDataInterface,
    current: FormDataInterface
  ): boolean {
    return (
      previous.name !== current.name ||
      previous.phone !== current.phone ||
      previous.subject !== current.subject ||
      previous.message !== current.message
    );
  }

  public static maskSensitiveData(data: FormDataInterface): Partial<FormDataInterface> {
    return {
      name: data.name.substring(0, 1) + '***',
      phone: data.phone.substring(0, 3) + '***',
      subject: data.subject.substring(0, 5) + '...',
      message: data.message.substring(0, 10) + '...',
    };
  }
}

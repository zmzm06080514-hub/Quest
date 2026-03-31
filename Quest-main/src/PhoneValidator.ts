/**
 * 전화번호 검증 및 포매팅
 */

export class PhoneValidator {
  /**
   * 전화번호 정규화 (숫자만)
   */
  public sanitize(phone: string): string {
    return phone.replace(/[^0-9]/g, '').slice(0, 11);
  }

  /**
   * 전화번호 포매팅 (010-1234-5678 형식)
   */
  public format(phone: string): string {
    const sanitized = this.sanitize(phone);
    if (sanitized.length <= 3) return sanitized;
    if (sanitized.length <= 7) return `${sanitized.slice(0, 3)}-${sanitized.slice(3)}`;
    return `${sanitized.slice(0, 3)}-${sanitized.slice(3, 7)}-${sanitized.slice(7)}`;
  }

  /**
   * 전화번호 유효성 검사
   */
  public validate(phone: string): { isValid: boolean; message?: string } {
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

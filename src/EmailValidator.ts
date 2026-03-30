/**
 * 이메일 검증
 */

export class EmailValidator {
  /**
   * 이메일 유효성 검사
   */
  public validate(email: string): { isValid: boolean; message?: string } {
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

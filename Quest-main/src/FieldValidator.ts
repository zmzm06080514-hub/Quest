/**
 * 텍스트 필드 검증
 */

export class FieldValidator {
  /**
   * 필수 필드 검증
   */
  public validateRequired(value: string, fieldName: string): { isValid: boolean; message?: string } {
    if (!value.trim()) {
      return { isValid: false, message: `${fieldName}을(를) 입력해주세요.` };
    }
    return { isValid: true };
  }

  /**
   * 최소 길이 검증
   */
  public validateMinLength(value: string, minLength: number, fieldName: string): { isValid: boolean; message?: string } {
    if (value.trim().length < minLength) {
      return { isValid: false, message: `${fieldName}은 최소 ${minLength}글자 이상이어야 합니다.` };
    }
    return { isValid: true };
  }

  /**
   * 최대 길이 검증
   */
  public validateMaxLength(value: string, maxLength: number, fieldName: string): { isValid: boolean; message?: string } {
    if (value.trim().length > maxLength) {
      return { isValid: false, message: `${fieldName}은 최대 ${maxLength}글자까지 입력 가능합니다.` };
    }
    return { isValid: true };
  }
}

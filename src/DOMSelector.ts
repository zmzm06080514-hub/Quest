/**
 * DOM 요소 선택 중앙화 클래스
 */

export class DOMSelector {
  /**
   * ID로 요소 선택
   */
  public static getElementById(id: string): HTMLElement | null {
    return document.getElementById(id);
  }

  /**
   * ID로 입력 요소 선택
   */
  public static getInputById(id: string): HTMLInputElement | null {
    return document.getElementById(id) as HTMLInputElement;
  }

  /**
   * ID로 텍스트에어리어 선택
   */
  public static getTextAreaById(id: string): HTMLTextAreaElement | null {
    return document.getElementById(id) as HTMLTextAreaElement;
  }

  /**
   * ID로 폼 선택
   */
  public static getFormById(id: string): HTMLFormElement | null {
    return document.getElementById(id) as HTMLFormElement;
  }

  /**
   * ID로 버튼 선택
   */
  public static getButtonById(id: string): HTMLButtonElement | null {
    return document.getElementById(id) as HTMLButtonElement;
  }

  /**
   * 셀렉터로 모든 요소 선택
   */
  public static querySelectorAll(selector: string): NodeListOf<Element> {
    return document.querySelectorAll(selector);
  }

  /**
   * 클래스명으로 모든 요소 선택
   */
  public static getElementsByClass(className: string): HTMLCollectionOf<Element> {
    return document.getElementsByClassName(className);
  }

  /**
   * 폼의 모든 입력 요소 선택
   */
  public static getFormInputs(formId: string): NodeListOf<Element> {
    const form = this.getFormById(formId);
    return form
      ? form.querySelectorAll('input, textarea')
      : document.querySelectorAll(':not(form)');
  }

  /**
   * 에러 메시지 요소 선택
   */
  public static getErrorElement(fieldId: string): HTMLElement | null {
    return this.getElementById(`${fieldId}-error`);
  }

  /**
   * 특정 속성값으로 요소 선택
   */
  public static querySelector(selector: string): Element | null {
    return document.querySelector(selector);
  }

  /**
   * 모달 요소 선택
   */
  public static getModalOverlay(): HTMLElement | null {
    return this.getElementById('modal-overlay');
  }

  /**
   * 모달 요소 선택
   */
  public static getModal(): HTMLElement | null {
    return this.getElementById('modal');
  }

  /**
   * 토스트 컨테이너 선택
   */
  public static getToastContainer(): HTMLElement | null {
    return this.getElementById('toast-container');
  }

  /**
   * 스크롤 애니메이션 요소 선택
   */
  public static getRevealElements(): NodeListOf<Element> {
    return this.querySelectorAll('.reveal-text');
  }

  /**
   * 현재 활성 모달 확인
   */
  public static isModalOpen(): boolean {
    const modal = this.getModal();
    return modal?.classList.contains('active') || false;
  }
}

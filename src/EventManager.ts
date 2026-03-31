/**
 * 이벤트 관리자 - 모든 이벤트 리스너 등록/제거
 */

export class EventManager {
  /**
   * 모달 열기/닫기 버튼 이벤트 등록
   */
  public registerModalEvents(
    onOpen: () => void,
    onClose: () => void,
    onOverlayClick: (e: MouseEvent) => void
  ): void {
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const closeButton = document.getElementById('modal-close');
    const cancelButton = document.getElementById('modal-cancel');
    const modalOverlay = document.getElementById('modal-overlay');

    openButtons.forEach((btn) => {
      btn.addEventListener('click', onOpen);
    });

    closeButton?.addEventListener('click', onClose);
    cancelButton?.addEventListener('click', onClose);
    modalOverlay?.addEventListener('click', (e) => onOverlayClick(e as MouseEvent));
  }

  /**
   * 폼 제출 버튼 이벤트 등록
   */
  public registerFormSubmitEvent(onSubmit: (e: Event) => void): void {
    const form = document.getElementById('f-contact') as HTMLFormElement | null;
    const submitButton = document.getElementById('modal-submit');
    form?.addEventListener('submit', onSubmit);
    submitButton?.addEventListener('click', () => form?.requestSubmit());
  }

  /**
   * 입력 필드 이벤트 등록
   */
  public registerInputEvent(fieldId: string, onInput: (e: Event) => void): void {
    const field = document.getElementById(fieldId);
    if (field) {
      field.addEventListener('input', onInput);
    }
  }

  /**
   * 폼 키보드 이벤트 등록
   */
  public registerFormKeyboardEvent(onKeyDown: (e: KeyboardEvent) => void): void {
    const form = document.getElementById('f-contact');
    if (form) {
      form.addEventListener('keydown', (e) => onKeyDown(e));
    }
  }
}

import type { FormDataInterface } from './types.js';
import { FormValidator } from './FormValidator.js';
import { ModalManager } from './ModalManager.js';
import { ScrollAnimationManager } from './ScrollAnimationManager.js';
import { ToastManager } from './ToastManager.js';
import { PhoneInputManager } from './PhoneInputManager.js';
import { FormManager } from './FormManager.js';
import { EventManager } from './EventManager.js';
import { ErrorDisplayManager } from './ErrorDisplayManager.js';
import { SubmitHandler } from './SubmitHandler.js';

export class UIManager {
  private formValidator: FormValidator;
  private modalManager: ModalManager;
  private scrollAnimationManager: ScrollAnimationManager;
  private toastManager: ToastManager;
  private phoneInputManager: PhoneInputManager;
  private formManager: FormManager;
  private eventManager: EventManager;
  private errorDisplayManager: ErrorDisplayManager;
  private submitHandler: SubmitHandler;

  constructor() {
    this.formValidator = new FormValidator();
    this.modalManager = new ModalManager();
    this.scrollAnimationManager = new ScrollAnimationManager();
    this.toastManager = new ToastManager();
    this.phoneInputManager = new PhoneInputManager();
    this.formManager = new FormManager();
    this.eventManager = new EventManager();
    this.errorDisplayManager = new ErrorDisplayManager();
    this.submitHandler = new SubmitHandler();

    this.initializeComponents();
    this.registerEventListeners();
  }

  private initializeComponents(): void {
    this.scrollAnimationManager.initScrollReveal();
    this.phoneInputManager.initEventListener();
    this.errorDisplayManager.attachAllFieldFocusHandlers([
      'f-name',
      'f-phone',
      'f-subject',
      'f-message',
    ]);
  }

  private registerEventListeners(): void {
    this.eventManager.registerModalEvents(
      this.openModal.bind(this),
      this.closeModal.bind(this),
      this.handleOverlayClick.bind(this)
    );
    this.eventManager.registerFormSubmitEvent(this.handleSubmit.bind(this));
    this.eventManager.registerInputEvent('f-phone', this.handlePhoneInput.bind(this));
    this.eventManager.registerFormKeyboardEvent(this.handleFormKeyboard.bind(this));
  }

  public openModal(): void {
    this.modalManager.open();
  }

  public closeModal(): void {
    this.modalManager.close();
  }

  private handleOverlayClick(e: MouseEvent): void {
    this.modalManager.handleOverlayClick(e);
  }

  private async handleSubmit(e?: Event): Promise<void> {
    if (e) e.preventDefault();

    const formData = this.formManager.collectFormData();
    const validationResult = this.formValidator.validateForm(formData);

    if (!validationResult.isValid) {
      this.errorDisplayManager.displayMultipleErrors(validationResult.errors);
      this.toastManager.error('입력 정보를 다시 확인해주세요.');
      return;
    }

    const submitResult = await this.submitHandler.submit(formData);

    if (submitResult.success) {
      this.toastManager.success(submitResult.message);
      this.formManager.resetForm();
      this.closeModal();
      return;
    }

    this.toastManager.error(submitResult.message);
  }

  private handlePhoneInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    const sanitized = this.formValidator.sanitizePhoneNumber(input.value);
    const formatted = this.formValidator.formatPhoneNumber(sanitized);
    this.formManager.setFieldValue('f-phone', formatted);
  }

  private handleFormKeyboard(e: KeyboardEvent): void {
    if (e.key === 'Enter' && e.ctrlKey) {
      this.handleSubmit();
    }
  }

  public getFormData(): FormDataInterface {
    return this.formManager.collectFormData();
  }

  public destroy(): void {
    this.scrollAnimationManager.destroy();
  }
}

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
    initializeComponents() {
        this.scrollAnimationManager.initScrollReveal();
        this.phoneInputManager.initEventListener();
        this.errorDisplayManager.attachAllFieldFocusHandlers([
            'f-name',
            'f-phone',
            'f-subject',
            'f-message',
        ]);
    }
    registerEventListeners() {
        this.eventManager.registerModalEvents(this.openModal.bind(this), this.closeModal.bind(this), this.handleOverlayClick.bind(this));
        this.eventManager.registerFormSubmitEvent(this.handleSubmit.bind(this));
        this.eventManager.registerInputEvent('f-phone', this.handlePhoneInput.bind(this));
        this.eventManager.registerFormKeyboardEvent(this.handleFormKeyboard.bind(this));
    }
    openModal() {
        this.modalManager.open();
    }
    closeModal() {
        this.modalManager.close();
    }
    handleOverlayClick(e) {
        this.modalManager.handleOverlayClick(e);
    }
    async handleSubmit(e) {
        if (e)
            e.preventDefault();
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
    handlePhoneInput(e) {
        const input = e.target;
        const sanitized = this.formValidator.sanitizePhoneNumber(input.value);
        const formatted = this.formValidator.formatPhoneNumber(sanitized);
        this.formManager.setFieldValue('f-phone', formatted);
    }
    handleFormKeyboard(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            this.handleSubmit();
        }
    }
    getFormData() {
        return this.formManager.collectFormData();
    }
    destroy() {
        this.scrollAnimationManager.destroy();
    }
}

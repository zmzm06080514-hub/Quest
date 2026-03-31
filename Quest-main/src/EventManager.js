export class EventManager {
    registerModalEvents(onOpen, onClose, onOverlayClick) {
        const openButtons = document.querySelectorAll('[data-modal-open]');
        const closeButton = document.getElementById('modal-close');
        const cancelButton = document.getElementById('modal-cancel');
        const modalOverlay = document.getElementById('modal-overlay');
        openButtons.forEach((btn) => {
            btn.addEventListener('click', onOpen);
        });
        closeButton?.addEventListener('click', onClose);
        cancelButton?.addEventListener('click', onClose);
        modalOverlay?.addEventListener('click', (e) => onOverlayClick(e));
    }
    registerFormSubmitEvent(onSubmit) {
        const submitButton = document.getElementById('modal-submit');
        submitButton?.addEventListener('click', onSubmit);
    }
    registerInputEvent(fieldId, onInput) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', onInput);
        }
    }
    registerFormKeyboardEvent(onKeyDown) {
        const form = document.getElementById('f-contact');
        if (form) {
            form.addEventListener('keydown', (e) => onKeyDown(e));
        }
    }
}
//# sourceMappingURL=EventManager.js.map
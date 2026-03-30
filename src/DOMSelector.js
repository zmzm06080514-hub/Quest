export class DOMSelector {
    static getElementById(id) {
        return document.getElementById(id);
    }
    static getInputById(id) {
        return document.getElementById(id);
    }
    static getTextAreaById(id) {
        return document.getElementById(id);
    }
    static getFormById(id) {
        return document.getElementById(id);
    }
    static getButtonById(id) {
        return document.getElementById(id);
    }
    static querySelectorAll(selector) {
        return document.querySelectorAll(selector);
    }
    static getElementsByClass(className) {
        return document.getElementsByClassName(className);
    }
    static getFormInputs(formId) {
        const form = this.getFormById(formId);
        return form
            ? form.querySelectorAll('input, textarea')
            : document.querySelectorAll(':not(form)');
    }
    static getErrorElement(fieldId) {
        return this.getElementById(`${fieldId}-error`);
    }
    static querySelector(selector) {
        return document.querySelector(selector);
    }
    static getModalOverlay() {
        return this.getElementById('modal-overlay');
    }
    static getModal() {
        return this.getElementById('modal');
    }
    static getToastContainer() {
        return this.getElementById('toast-container');
    }
    static getRevealElements() {
        return this.querySelectorAll('.reveal-text');
    }
    static isModalOpen() {
        const modal = this.getModal();
        return modal?.classList.contains('active') || false;
    }
}
//# sourceMappingURL=DOMSelector.js.map
export class ToastManager {
    constructor() {
        this.toastContainer = document.getElementById('toast-container');
    }
    show(message, type = 'info', duration = 3500) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        if (!this.toastContainer) {
            const container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
            this.toastContainer = container;
        }
        this.toastContainer.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
    success(message) {
        this.show(message, 'success');
    }
    error(message) {
        this.show(message, 'error');
    }
    info(message) {
        this.show(message, 'info');
    }
}
//# sourceMappingURL=ToastManager.js.map
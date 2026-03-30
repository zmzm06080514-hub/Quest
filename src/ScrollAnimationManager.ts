export class ScrollAnimationManager {
  private observer: IntersectionObserver | null = null;

  public initScrollReveal(): void {
    this.prepareRevealTargets();

    const options = {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        this.observer?.unobserve(entry.target);
      });
    }, options);

    const revealElements = document.querySelectorAll('.reveal-text');
    revealElements.forEach((el) => {
      this.observer?.observe(el);
    });
  }

  private prepareRevealTargets(): void {
    const selectors = [
      '.hero .badge',
      '.hero .hero-title',
      '.hero .hero-description',
      '.hero .btn-cta',
      '.stats > *',
      '.section-header > *',
      '.features-grid > *',
      '.process-timeline > *',
      '.pricing-section .pricing-card',
      '.price-features li',
      '.modal-form .form-group',
      '.modal-actions > *',
      '.footer p',
    ];

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.classList.add('reveal-text');
        const htmlElement = element as HTMLElement;
        if (!htmlElement.style.getPropertyValue('--reveal-delay')) {
          htmlElement.style.setProperty('--reveal-delay', `${index * 90}ms`);
        }
      });
    });
  }

  public destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

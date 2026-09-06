/**
 * Janbhasha Platform Main Interactive Runtime
 * Handles:
 * - Privacy-Preserving Telemetry & Event Analytics
 * - Accessible Mobile Navigation
 * - Dark / Light Architectural Theme Switcher
 * - Cookie Consent Compliance Banner
 * - Form Validation with Accessible Error States
 */

(function () {
  'use strict';

  // 1. Privacy-Preserving Telemetry Engine
  const Telemetry = {
    sessionId: 'jb_' + Math.random().toString(36).substring(2, 10),
    startTime: Date.now(),
    
    init() {
      this.trackPageView();
      this.attachEventListeners();
    },

    trackPageView() {
      const payload = {
        event: 'page_view',
        path: window.location.pathname,
        title: document.title,
        timestamp: new Date().toISOString(),
        referrer: document.referrer || 'direct',
        session: this.sessionId
      };
      this.send(payload);
    },

    trackEvent(category, action, label = null, value = null) {
      const payload = {
        event: 'interaction',
        category,
        action,
        label,
        value,
        timestamp: new Date().toISOString(),
        session: this.sessionId
      };
      this.send(payload);
    },

    send(data) {
      // In production, transmits to /api/telemetry/events with sendBeacon
      if (window.navigator && window.navigator.sendBeacon) {
        // Beacon call or console audit log
        console.log('[Janbhasha Telemetry Audit]', data);
      }
    },

    attachEventListeners() {
      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-analytics-event]');
        if (target) {
          const action = target.getAttribute('data-analytics-event');
          const category = target.getAttribute('data-analytics-category') || 'general';
          Telemetry.trackEvent(category, action);
        }
      });
    }
  };

  // 2. Architectural Theme Management
  const ThemeManager = {
    init() {
      const savedTheme = localStorage.getItem('janbhasha_theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
      this.applyTheme(initialTheme);

      const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
      toggleButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
          const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
          ThemeManager.applyTheme(nextTheme);
          localStorage.setItem('janbhasha_theme', nextTheme);
        });
      });
    },

    applyTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
      toggleButtons.forEach((btn) => {
        btn.textContent = theme === 'dark' ? 'LIGHT MODE' : 'DARK MODE';
        btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
      });
    }
  };

  // 3. Mobile Navigation
  const MobileNav = {
    init() {
      const toggleBtn = document.querySelector('.mobile-menu-toggle');
      const mainNav = document.querySelector('.main-nav');
      if (!toggleBtn || !mainNav) return;

      toggleBtn.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('is-open');
        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        toggleBtn.textContent = isOpen ? 'CLOSE [X]' : 'MENU [=]';
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-header') && mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
          toggleBtn.textContent = 'MENU [=]';
        }
      });
    }
  };

  // 4. Cookie Consent Management
  const CookieConsent = {
    init() {
      const banner = document.getElementById('cookieBanner');
      if (!banner) return;

      const consent = localStorage.getItem('janbhasha_cookie_consent');
      if (!consent) {
        banner.classList.add('visible');
      }

      const acceptBtn = document.getElementById('acceptCookiesBtn');
      const essentialBtn = document.getElementById('essentialCookiesBtn');

      if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('janbhasha_cookie_consent', 'full');
          banner.classList.remove('visible');
          Telemetry.trackEvent('consent', 'accepted_full');
        });
      }

      if (essentialBtn) {
        essentialBtn.addEventListener('click', () => {
          localStorage.setItem('janbhasha_cookie_consent', 'essential');
          banner.classList.remove('visible');
          Telemetry.trackEvent('consent', 'accepted_essential');
        });
      }
    }
  };

  // 5. Accessible Form Validation & Error States
  const FormHandler = {
    init() {
      const forms = document.querySelectorAll('form[data-validate="true"]');
      forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (FormHandler.validateForm(form)) {
            FormHandler.handleSuccess(form);
          }
        });

        // Real-time blur validation
        form.querySelectorAll('input, select, textarea').forEach((input) => {
          input.addEventListener('blur', () => {
            FormHandler.validateField(input);
          });
          input.addEventListener('input', () => {
            if (input.getAttribute('aria-invalid') === 'true') {
              FormHandler.validateField(input);
            }
          });
        });
      });
    },

    validateField(field) {
      const group = field.closest('.form-group');
      if (!group) return true;

      const errorMsg = group.querySelector('.form-error-message');
      let isValid = true;
      let message = '';

      if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required.';
      } else if (field.type === 'email' && field.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
          isValid = false;
          message = 'Please provide a valid institutional email address.';
        }
      } else if (field.name === 'phone' && field.value.trim()) {
        const phoneRegex = /^[0-9+\s\-()]{8,20}$/;
        if (!phoneRegex.test(field.value.trim())) {
          isValid = false;
          message = 'Please provide a valid contact phone number.';
        }
      }

      if (!isValid) {
        group.classList.add('has-error');
        field.setAttribute('aria-invalid', 'true');
        if (errorMsg) {
          errorMsg.textContent = message;
          errorMsg.style.display = 'block';
        }
      } else {
        group.classList.remove('has-error');
        field.removeAttribute('aria-invalid');
        if (errorMsg) {
          errorMsg.textContent = '';
          errorMsg.style.display = 'none';
        }
      }

      return isValid;
    },

    validateForm(form) {
      let formIsValid = true;
      const inputs = form.querySelectorAll('input, select, textarea');
      const banner = form.querySelector('.form-global-banner');

      inputs.forEach((input) => {
        const fieldValid = FormHandler.validateField(input);
        if (!fieldValid) {
          formIsValid = false;
        }
      });

      if (!formIsValid) {
        if (banner) {
          banner.className = 'form-global-banner banner-error';
          banner.textContent = 'Please correct the highlighted errors above before proceeding.';
          banner.style.display = 'block';
        }
        // Focus first invalid input
        const firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        Telemetry.trackEvent('form', 'validation_failed', form.id || 'form');
      } else {
        if (banner) {
          banner.style.display = 'none';
        }
      }

      return formIsValid;
    },

    handleSuccess(form) {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING INTAKE...';
      }

      Telemetry.trackEvent('form', 'submission_success', form.id || 'form');

      // Generate reference ID and navigate to thank-you.html
      setTimeout(() => {
        const refId = 'JB-PLT-' + Math.floor(100000 + Math.random() * 900000);
        sessionStorage.setItem('janbhasha_pilot_ref', refId);
        window.location.href = 'thank-you.html?ref=' + refId;
      }, 700);
    }
  };

  // DOM Content Loaded Handler
  document.addEventListener('DOMContentLoaded', () => {
    Telemetry.init();
    ThemeManager.init();
    MobileNav.init();
    CookieConsent.init();
    FormHandler.init();
  });

  // Expose Global Telemetry API for custom demo interactions
  window.JanbhashaTelemetry = Telemetry;
})();

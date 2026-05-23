/**
 * js/pages/awas-forms.js
 * ─────────────────────────────────────────────────────
 * Form validation for all AWAS sub-pages:
 *   • awas-signup.html      → #signup-form
 *   • awas-login.html       → #login-form
 *   • awas-ebill.html       → #ebill-form
 *   • awas-connection.html  → #connection-form
 *
 * HOW IT WORKS:
 *   Each field has a corresponding <span class="form-group__error"> in the HTML.
 *   Adding the class "has-error" to the parent .form-group shows the red border
 *   and makes the error span visible (handled by css/components/forms.css).
 *
 * ADDING A NEW FIELD:
 *   1. Add your <input> inside a <div class="form-group" id="fg-yourfield">
 *   2. Add <span class="form-group__error" id="yourfield-error">Message here.</span>
 *   3. Call showError() / clearError() in the validate function below.
 * ─────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ─── HELPERS ─────────────────────────────────────── */

  /** Mark a form-group as invalid and show its error span. */
  function showError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const span  = document.getElementById(errorId);
    if (group) group.classList.add('has-error');
    if (span && message) span.textContent = message;
  }

  /** Remove the error state from a form-group. */
  function clearError(groupId) {
    const group = document.getElementById(groupId);
    if (group) group.classList.remove('has-error');
  }

  /** Attach a live listener that clears the error as soon as the user types. */
  function clearOnInput(inputId, groupId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.addEventListener('input', () => clearError(groupId));
  }

  const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MOBILE_RE = /^(09|\+639)\d{9}$/;

  /* ─── SIGN-UP FORM ────────────────────────────────── */

  const signupForm = document.getElementById('signup-form');
  if (signupForm) {

    // Live clear-on-input for every field
    [
      ['firstname',       'fg-firstname'],
      ['lastname',        'fg-lastname'],
      ['account-number',  'fg-account'],
      ['email',           'fg-email'],
      ['new-password',    'fg-new-password'],
      ['confirm-password','fg-confirm-password'],
    ].forEach(([id, gid]) => clearOnInput(id, gid));

    // Show password-strength hint in real time
    const pwdInput = document.getElementById('new-password');
    if (pwdInput) {
      pwdInput.addEventListener('input', function () {
        const hint = document.getElementById('new-password-hint');
        if (!hint) return;
        const len = this.value.length;
        if (len === 0) {
          hint.textContent = 'Minimum 8 characters.';
          hint.style.color = '';
        } else if (len < 8) {
          hint.textContent = `${8 - len} more character${8 - len > 1 ? 's' : ''} needed.`;
          hint.style.color = 'var(--color-red)';
        } else {
          hint.textContent = 'Looks good!';
          hint.style.color = 'green';
        }
      });
    }

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const first    = document.getElementById('firstname');
      const last     = document.getElementById('lastname');
      const acct     = document.getElementById('account-number');
      const email    = document.getElementById('email');
      const pwd      = document.getElementById('new-password');
      const confirm  = document.getElementById('confirm-password');
      let   ok       = true;

      // First name
      if (!first || !first.value.trim()) {
        showError('fg-firstname', 'firstname-error', 'First name is required.');
        ok = false;
      } else {
        clearError('fg-firstname');
      }

      // Last name
      if (!last || !last.value.trim()) {
        showError('fg-lastname', 'lastname-error', 'Last name is required.');
        ok = false;
      } else {
        clearError('fg-lastname');
      }

      // Account number
      if (!acct || !acct.value.trim()) {
        showError('fg-account', 'account-error', 'Account number is required.');
        ok = false;
      } else {
        clearError('fg-account');
      }

      // Email
      if (!email || !EMAIL_RE.test(email.value.trim())) {
        showError('fg-email', 'email-error', 'Please enter a valid email address (e.g. juan@example.com).');
        ok = false;
      } else {
        clearError('fg-email');
      }

      // Password length
      if (!pwd || pwd.value.length < 8) {
        showError('fg-new-password', 'new-password-error', 'Password must be at least 8 characters.');
        ok = false;
      } else {
        clearError('fg-new-password');
      }

      // Confirm password match
      if (!confirm || confirm.value !== (pwd ? pwd.value : '')) {
        showError('fg-confirm-password', 'confirm-password-error', 'Passwords do not match. Please re-enter.');
        ok = false;
      } else {
        clearError('fg-confirm-password');
      }

      if (!ok) {
        // Scroll to the first error so the user sees it
        const firstError = signupForm.querySelector('.form-group.has-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // ✅ All valid — submit logic here
      alert('Account created successfully! You may now log in.');
      signupForm.reset();
      const hint = document.getElementById('new-password-hint');
      if (hint) { hint.textContent = 'Minimum 8 characters.'; hint.style.color = ''; }
    });
  }

  /* ─── LOGIN FORM ──────────────────────────────────── */

  const loginForm = document.getElementById('login-form');
  if (loginForm) {

    clearOnInput('username', 'fg-username');
    clearOnInput('password', 'fg-password');

    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const username = document.getElementById('username');
      const password = document.getElementById('password');
      let   ok       = true;

      // Username / account number
      if (!username || !username.value.trim()) {
        showError('fg-username', 'username-error', 'Please enter your username or account number.');
        ok = false;
      } else {
        clearError('fg-username');
      }

      // Password — just check it's not empty on the login page
      if (!password || !password.value) {
        showError('fg-password', 'password-error', 'Please enter your password.');
        ok = false;
      } else {
        clearError('fg-password');
      }

      if (!ok) return;

      // ✅ All valid — submit logic here (e.g. send to server)
      alert('Logged in successfully!');
    });
  }

  /* ─── E-BILL FORM ─────────────────────────────────── */

  const ebillForm = document.getElementById('ebill-form');
  if (ebillForm) {

    clearOnInput('ebill-account', 'fg-ebill-account');
    clearOnInput('ebill-email',   'fg-ebill-email');

    ebillForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const acct  = document.getElementById('ebill-account');
      const email = document.getElementById('ebill-email');
      let   ok    = true;

      // Account number
      if (!acct || !acct.value.trim()) {
        showError('fg-ebill-account', 'ebill-account-error', 'Account number is required.');
        ok = false;
      } else {
        clearError('fg-ebill-account');
      }

      // Email
      if (!email || !EMAIL_RE.test(email.value.trim())) {
        showError('fg-ebill-email', 'ebill-email-error', 'Please enter a valid email address (e.g. juan@example.com).');
        ok = false;
      } else {
        clearError('fg-ebill-email');
      }

      if (!ok) return;

      // ✅ All valid
      alert('Registration submitted! A confirmation will be sent to your email.');
      this.reset();
    });
  }

  /* ─── NEW SERVICE CONNECTION FORM ────────────────── */

  const connectionForm = document.getElementById('connection-form');
  if (connectionForm) {

    clearOnInput('conn-firstname', 'fg-conn-first');
    clearOnInput('conn-lastname',  'fg-conn-last');
    clearOnInput('conn-email',     'fg-conn-email');
    clearOnInput('conn-mobile',    'fg-conn-mobile');

    connectionForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const first    = document.getElementById('conn-firstname');
      const last     = document.getElementById('conn-lastname');
      const email    = document.getElementById('conn-email');
      const mobile   = document.getElementById('conn-mobile');
      const connType = document.getElementById('conn-type');
      let   ok       = true;

      // First name
      if (!first || !first.value.trim()) {
        showError('fg-conn-first', 'conn-first-error', 'First name is required.');
        ok = false;
      } else {
        clearError('fg-conn-first');
      }

      // Last name
      if (!last || !last.value.trim()) {
        showError('fg-conn-last', 'conn-last-error', 'Last name is required.');
        ok = false;
      } else {
        clearError('fg-conn-last');
      }

      // Email
      if (!email || !EMAIL_RE.test(email.value.trim())) {
        showError('fg-conn-email', 'conn-email-error', 'Please enter a valid email address (e.g. juan@example.com).');
        ok = false;
      } else {
        clearError('fg-conn-email');
      }

      // Mobile (Philippine format: 09XXXXXXXXX or +639XXXXXXXXX)
      if (!mobile || !MOBILE_RE.test(mobile.value.trim())) {
        showError('fg-conn-mobile', 'conn-mobile-error', 'Enter a valid Philippine mobile number (e.g. 09171234567).');
        ok = false;
      } else {
        clearError('fg-conn-mobile');
      }

      // Connection type — select element, no dedicated fg- wrapper in HTML so use alert
      if (!connType || !connType.value) {
        // Highlight the select if no group wrapper
        if (connType) connType.style.borderColor = 'var(--color-red)';
        alert('Please select a connection type.');
        ok = false;
      } else {
        if (connType) connType.style.borderColor = '';
      }

      if (!ok) {
        const firstError = connectionForm.querySelector('.form-group.has-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // ✅ All valid — move to step 2
      alert('Step 1 complete! A BCWD representative will contact you within 3–5 business days.');
    });
  }

  /* ─── GLOBAL: update footer year ─────────────────── */
  document.querySelectorAll('.year, #year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

})();
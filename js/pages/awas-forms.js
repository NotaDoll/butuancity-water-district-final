// Form validation for E-Bill and Connection pages
(function() {
  'use strict';
  
  // E-Bill form validation
  const ebillForm = document.getElementById('ebill-form');
  if (ebillForm) {
    ebillForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const accountInput = document.getElementById('ebill-account');
      const emailInput = document.getElementById('ebill-email');
      let isValid = true;
      
      // Validate account number
      if (!accountInput.value.trim()) {
        document.getElementById('fg-ebill-account')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('fg-ebill-account')?.classList.remove('has-error');
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
        document.getElementById('fg-ebill-email')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('fg-ebill-email')?.classList.remove('has-error');
      }
      
      if (isValid) {
        alert('Registration submitted! A confirmation will be sent to your email.');
        this.reset();
      }
    });
    
    // Clear errors on input
    document.getElementById('ebill-account')?.addEventListener('input', function() {
      if (this.value.trim()) {
        document.getElementById('fg-ebill-account')?.classList.remove('has-error');
      }
    });
    
    document.getElementById('ebill-email')?.addEventListener('input', function() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value.trim() && emailRegex.test(this.value)) {
        document.getElementById('fg-ebill-email')?.classList.remove('has-error');
      }
    });
  }
  
  // Service Connection form validation (step 1)
  const connectionForm = document.getElementById('connection-form');
  if (connectionForm) {
    connectionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const firstName = document.getElementById('conn-firstname');
      const lastName = document.getElementById('conn-lastname');
      const email = document.getElementById('conn-email');
      const mobile = document.getElementById('conn-mobile');
      const connType = document.getElementById('conn-type');
      let isValid = true;
      
      // Validate first name
      if (!firstName.value.trim()) {
        document.getElementById('fg-conn-first')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('fg-conn-first')?.classList.remove('has-error');
      }
      
      // Validate last name
      if (!lastName.value.trim()) {
        document.getElementById('fg-conn-last')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('fg-conn-last')?.classList.remove('has-error');
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        document.getElementById('fg-conn-email')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('fg-conn-email')?.classList.remove('has-error');
      }
      
      // Validate mobile (Philippine number pattern)
      const mobileRegex = /^(09|\+639)\d{9}$/;
      if (!mobile.value.trim() || !mobileRegex.test(mobile.value)) {
        document.getElementById('fg-conn-mobile')?.classList.add('has-error');
        isValid = false;
      } else {
        document.getElementById('fg-conn-mobile')?.classList.remove('has-error');
      }
      
      // Validate connection type
      if (!connType.value) {
        alert('Please select a connection type');
        isValid = false;
      }
      
      if (isValid) {
        alert('Application step 1 complete! Proceeding to next step...');
        // Here you would typically move to step 2
      }
    });
    
    // Real-time validation clearing
    const clearError = (fieldId, groupId) => {
      document.getElementById(fieldId)?.addEventListener('input', function() {
        if (this.value.trim()) {
          document.getElementById(groupId)?.classList.remove('has-error');
        }
      });
    };
    
    clearError('conn-firstname', 'fg-conn-first');
    clearError('conn-lastname', 'fg-conn-last');
    clearError('conn-email', 'fg-conn-email');
    clearError('conn-mobile', 'fg-conn-mobile');
  }
  
  // Update year in footer
  const yearSpan = document.querySelector('.year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
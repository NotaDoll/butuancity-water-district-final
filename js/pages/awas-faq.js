// FAQ Accordion functionality with proper padding support
(function() {
  'use strict';
  
  const faqItems = document.querySelectorAll('.faq-item');
  const faqQuestions = document.querySelectorAll('.faq-item__question');
  
  function initFaqAccordion() {
    // Ensure all FAQ items start closed
    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-item__question');
      if (btn && !btn.hasAttribute('aria-expanded')) {
        btn.setAttribute('aria-expanded', 'false');
      }
      item.classList.remove('is-open');
    });
    
    // Add click handlers
    faqQuestions.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const currentItem = this.closest('.faq-item');
        const isCurrentlyOpen = currentItem.classList.contains('is-open');
        
        // Close all FAQ items
        faqItems.forEach(item => {
          item.classList.remove('is-open');
          const itemBtn = item.querySelector('.faq-item__question');
          if (itemBtn) {
            itemBtn.setAttribute('aria-expanded', 'false');
          }
        });
        
        // If the clicked item wasn't open, open it
        if (!isCurrentlyOpen) {
          currentItem.classList.add('is-open');
          this.setAttribute('aria-expanded', 'true');
          
          // Optional: Smooth scroll to the opened item (adds a little polish)
          setTimeout(() => {
            const rect = currentItem.getBoundingClientRect();
            const isVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
            if (!isVisible && rect.top < 0) {
              currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 100);
        }
      });
      
      // Keyboard support: Enter and Space keys
      btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqAccordion);
  } else {
    initFaqAccordion();
  }
})();
// Payment page tab functionality - Fixed version
(function() {
  'use strict';
  
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');
  
  function activateTab(tab) {
    const targetId = tab.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);
    
    // Deactivate all tabs and panels
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
    });
    
    panels.forEach(p => {
      p.classList.remove('is-active');
      p.setAttribute('hidden', 'true');
    });
    
    // Activate selected tab and panel
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    
    if (targetPanel) {
      targetPanel.classList.add('is-active');
      targetPanel.removeAttribute('hidden');
    }
  }
  
  if (tabs.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        activateTab(this);
      });
      
      // Keyboard navigation
      tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateTab(this);
        }
        
        const tabList = Array.from(tabs);
        const currentIndex = tabList.indexOf(this);
        
        if (e.key === 'ArrowRight') {
          const nextTab = tabList[(currentIndex + 1) % tabList.length];
          nextTab.focus();
          activateTab(nextTab);
        }
        
        if (e.key === 'ArrowLeft') {
          const prevTab = tabList[(currentIndex - 1 + tabList.length) % tabList.length];
          prevTab.focus();
          activateTab(prevTab);
        }
      });
    });
  }

  // Auto-update copyright year
  const yearSpan = document.querySelector('.year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
})();
/**
 * BCWD Main Script
 * ─────────────────────────────────────────────────────
 * Loads shared partials (navbar, advisory bar, footers)
 * from /partials/ so you only edit ONE file per component.
 *
 * FIX: The old partials/navbar.html included the advisory
 * bar HTML at the bottom, causing a duplicate when
 * #advisory-placeholder also loaded advisory-bar.html.
 * The navbar partial has been cleaned — it no longer
 * contains the advisory bar. The advisory bar is loaded
 * ONLY via #advisory-placeholder.
 *
 * HOW TO USE IN ANY PAGE:
 *
 *   Navbar:
 *     <div id="navbar-placeholder"></div>
 *     <div class="navbar-offset"></div>
 *
 *   Advisory bar:
 *     <div id="advisory-placeholder"></div>
 *
 *   Footer (main, used on homepage + about):
 *     <div id="footer-placeholder"></div>
 *
 *   Footer (secondary, used on sub-pages):
 *     <div id="footer-secondary-placeholder"></div>
 *
 * That's it. No other config needed.
 * ─────────────────────────────────────────────────────
 */

// Detect path depth so relative paths resolve correctly
const _depth  = window.location.pathname.split('/').filter(Boolean).length - 1;
const _prefix = _depth > 0 ? '../'.repeat(_depth) : '';

/**
 * Generic partial loader.
 * @param {string} placeholderId  - ID of the container div
 * @param {string} partialPath    - Path relative to site root (no leading slash)
 * @param {function} [onLoad]     - Optional callback after HTML is injected
 */
async function loadPartial(placeholderId, partialPath, onLoad) {
  const el = document.getElementById(placeholderId);
  if (!el) return; // placeholder not on this page — skip silently

  try {
    const res  = await fetch(_prefix + partialPath);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    el.innerHTML = html;

    // Fix relative hrefs/srcs if we're inside a subdirectory
    if (_depth > 0) {
      el.querySelectorAll('[href], [src]').forEach(node => {
        ['href', 'src'].forEach(attr => {
          const val = node.getAttribute(attr);
          if (val && !val.startsWith('http') && !val.startsWith('#') && !val.startsWith('mailto')) {
            node.setAttribute(attr, _prefix + val);
          }
        });
      });
    }

    if (typeof onLoad === 'function') onLoad(el);
  } catch (err) {
    console.warn(`[BCWD] Could not load partial "${partialPath}":`, err);
  }
}

// ── NAVBAR ──────────────────────────────────────────────
loadPartial('navbar-placeholder', 'partials/navbar.html', el => {
  // Mark the active nav link
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  el.querySelectorAll('.navbar__link').forEach(link => {
    const linkFile = link.getAttribute('href')?.split('/').pop();
    if (linkFile === currentFile) link.setAttribute('aria-current', 'page');
  });

  // Mobile hamburger toggle
  const toggle = el.querySelector('.navbar__toggle');
  const nav    = el.querySelector('.navbar__nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open');
    });

    nav.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }
});

// ── ADVISORY BAR ────────────────────────────────────────
// Loaded ONLY here. The navbar partial no longer contains
// the advisory bar, so there is no duplication.
loadPartial('advisory-placeholder', 'partials/advisory-bar.html');

// ── FOOTERS ─────────────────────────────────────────────
loadPartial('footer-placeholder',           'partials/footer-main.html',      updateYears);
loadPartial('footer-secondary-placeholder', 'partials/footer-secondary.html', updateYears);

// ── DYNAMIC YEAR ────────────────────────────────────────
function updateYears(container) {
  const scope = container || document;
  scope.querySelectorAll('.year, #year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}
updateYears();

// ── BREADCRUMBS ─────────────────────────────────────────
// Load the breadcrumb script dynamically after partials settle.
// This ensures the advisory bar is in the DOM before we
// try to insert the breadcrumb after it.
(function loadBreadcrumb() {
  const script = document.createElement('script');
  script.src = _prefix + 'js/breadcrumb.js';
  document.body.appendChild(script);
})();

// Load search functionality after navbar loads
const initSearch = setInterval(() => {
  if (document.querySelector('.navbar__search')) {
    clearInterval(initSearch);
    
    // Dynamically load search scripts
    const script1 = document.createElement('script');
    script1.src = _prefix + 'js/search-index.js';
    document.body.appendChild(script1);
    
    const script2 = document.createElement('script');
    script2.src = _prefix + 'js/site-search.js';
    document.body.appendChild(script2);
    
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = _prefix + 'css/site-search.css';
    document.head.appendChild(link);
  }
}, 100);
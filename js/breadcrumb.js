/**
 * js/breadcrumb.js
 * ─────────────────────────────────────────────────────
 * Auto-generates a breadcrumb nav after the advisory bar
 * on every page, based on the current URL.
 *
 * Rules:
 *  - Homepage (index.html) → no breadcrumb
 *  - Pages that already have a hand-written .sub-breadcrumb
 *    in their HTML → skip (don't double-up)
 *  - All other pages → inject an .auto-breadcrumb
 *
 * Page label map: add entries here whenever you add a page.
 * ─────────────────────────────────────────────────────
 */

(function () {
  'use strict';

  /* ── Page label map ── */
  const PAGE_LABELS = {
    'index.html':            'Home',
    '':                      'Home',          // root URL
    'awas.html':             'AWAS',
    'awas-bill-inquiry.html':'Bill Inquiry',
    'awas-calculator.html':  'Bill Calculator',
    'awas-connection.html':  'New Service Connection',
    'awas-ebill.html':       'E-Bill',
    'awas-faq.html':         'FAQ',
    'awas-login.html':       'Online Billing Inquiry',
    'awas-payment.html':     'Online Payment',
    'awas-signup.html':      'Sign Up',
    'bidding.html':          'Bidding & Procurement',
    'watershed.html':        'Watershed',
    'about.html':            'About BCWD',
    'news.html':             'Announcements & Advisories',
    'news-article.html':     'News Article',
    'water-rates.html':      'Water Rates',
    'lab-charges.html':      'Laboratory Charges',
    'transparency-seal.html':'Transparency Seal',
    'breakwater.html':       'Breakwater Publications',
  };

  /* ── Parent hierarchy ──
     Maps a page file → its logical parent page.
     Pages not listed here are treated as direct children of Home. */
  const PARENTS = {
    'awas-bill-inquiry.html': 'awas.html',
    'awas-calculator.html':   'awas.html',
    'awas-connection.html':   'awas.html',
    'awas-ebill.html':        'awas.html',
    'awas-faq.html':          'awas.html',
    'awas-login.html':        'awas.html',
    'awas-payment.html':      'awas.html',
    'awas-signup.html':       'awas-login.html',
    'news-article.html':      'news.html',
  };

  function getFileName() {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const last  = parts[parts.length - 1] || '';
    // Strip query/hash
    return last.split('?')[0].split('#')[0];
  }

  function buildCrumbs(file) {
    const crumbs = [];
    let current  = file;

    // Walk up parent chain (guard against infinite loops)
    let safety = 0;
    while (current && safety < 10) {
      const label  = PAGE_LABELS[current] || current;
      crumbs.unshift({ file: current, label });
      current = PARENTS[current];
      safety++;
    }

    // Always prepend Home
    if (crumbs[0]?.file !== 'index.html' && crumbs[0]?.file !== '') {
      crumbs.unshift({ file: 'index.html', label: 'Home' });
    }

    return crumbs;
  }

  function render(crumbs, prefix) {
    const nav  = document.createElement('nav');
    nav.className  = 'auto-breadcrumb';
    nav.setAttribute('aria-label', 'Breadcrumb');

    const inner = document.createElement('ol');
    inner.className = 'auto-breadcrumb__inner';
    inner.setAttribute('role', 'list');

    crumbs.forEach((crumb, i) => {
      const li  = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = 'var(--space-1)';

      if (i > 0) {
        const sep = document.createElement('span');
        sep.className = 'auto-breadcrumb__sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '›';
        li.appendChild(sep);
      }

      const isLast = i === crumbs.length - 1;
      if (isLast) {
        const span = document.createElement('span');
        span.className = 'auto-breadcrumb__current';
        span.setAttribute('aria-current', 'page');
        span.textContent = crumb.label;
        li.appendChild(span);
      } else {
        const a = document.createElement('a');
        a.href = prefix + crumb.file;
        a.textContent = crumb.label;
        li.appendChild(a);
      }

      inner.appendChild(li);
    });

    nav.appendChild(inner);
    return nav;
  }

  function init() {
    const file = getFileName();

    // Skip homepage
    if (file === '' || file === 'index.html') return;

    // Skip if page already has a hand-written breadcrumb
    if (document.querySelector('.sub-breadcrumb')) return;

    // Figure out path prefix (same logic as main.js)
    const depth  = window.location.pathname.split('/').filter(Boolean).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';

    const crumbs = buildCrumbs(file);
    if (crumbs.length <= 1) return; // nothing useful to show

    const nav = render(crumbs, prefix);

    // Insert after advisory bar, or after navbar-offset, or at top of body
    const advisory  = document.querySelector('.advisory-bar, #advisory-placeholder');
    const navOffset = document.querySelector('.navbar-offset');

    if (advisory && advisory.nextSibling) {
      advisory.parentNode.insertBefore(nav, advisory.nextSibling);
    } else if (navOffset && navOffset.nextSibling) {
      navOffset.parentNode.insertBefore(nav, navOffset.nextSibling);
    } else {
      document.body.prepend(nav);
    }
  }

  // Run after partials have had a chance to load
  // (advisory-placeholder is populated async, so wait a tick)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(init, 50));
  } else {
    setTimeout(init, 50);
  }
})();
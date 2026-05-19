/**
 * Universal Site Search - Searches EVERY word on EVERY page
 */

let globalSearchIndex = [];

async function initUniversalSearch() {
  console.log('Initializing Universal Search...');
  
  const searchInput = document.getElementById('site-search');
  const searchButton = document.querySelector('.navbar__search button');
  
  if (!searchInput) {
    setTimeout(initUniversalSearch, 500);
    return;
  }
  
  // Load search index from localStorage
  await loadSearchIndex();
  
  // Setup event listeners
  setupEventListeners(searchInput, searchButton);
  
  console.log(`✅ Universal Search ready with ${globalSearchIndex.length} pages indexed`);
}

async function loadSearchIndex() {
  // Try to load from localStorage first
  const cached = localStorage.getItem('bcwd_search_index');
  
  if (cached) {
    try {
      const data = JSON.parse(cached);
      // Check if cache is less than 24 hours old
      if (Date.now() - data.timestamp < 24 * 60 * 60 * 1000) {
        globalSearchIndex = data.pages;
        console.log(`📦 Loaded ${globalSearchIndex.length} pages from cache`);
        return;
      }
    } catch(e) {}
  }
  
  // Wait for auto-indexer to finish
  if (window.searchIndexer) {
    // Wait for indexing to complete
    await new Promise(resolve => {
      const checkInterval = setInterval(() => {
        if (window.searchIndexer.searchIndex?.length > 0) {
          clearInterval(checkInterval);
          globalSearchIndex = window.searchIndexer.searchIndex;
          resolve();
        }
      }, 500);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 10000);
    });
  }
  
  if (globalSearchIndex.length === 0) {
    console.warn('No search index available, using fallback');
    globalSearchIndex = getFallbackIndex();
  }
}

function setupEventListeners(searchInput, searchButton) {
  // Search on button click
  if (searchButton) {
    searchButton.addEventListener('click', (e) => {
      e.preventDefault();
      performSearch(searchInput.value);
    });
  }
  
  // Search on Enter key
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch(searchInput.value);
    }
  });
  
  // Recent searches on focus
  searchInput.addEventListener('focus', () => {
    showRecentSearches();
  });
}

function performSearch(query) {
  if (!query || query.trim().length < 2) {
    showNotification('Please enter at least 2 characters', 'error');
    return;
  }
  
  query = query.trim().toLowerCase();
  
  // Save to recent searches
  saveToRecentSearches(query);
  
  // Search EVERYTHING
  const results = globalSearchIndex.map(page => {
    let score = 0;
    let matches = [];
    
    // Search in title (highest weight)
    if (page.title.toLowerCase().includes(query)) {
      score += 50;
      matches.push({ field: 'title', text: page.title });
      
      // Exact match bonus
      if (page.title.toLowerCase() === query) score += 100;
    }
    
    // Search in headings
    if (page.headings) {
      page.headings.forEach(heading => {
        if (heading.toLowerCase().includes(query)) {
          score += 30;
          matches.push({ field: 'heading', text: heading });
        }
      });
    }
    
    // Search in paragraphs (high weight for content)
    if (page.paragraphs) {
      page.paragraphs.forEach(para => {
        const paraLower = para.toLowerCase();
        const occurrences = (paraLower.match(new RegExp(query, 'g')) || []).length;
        if (occurrences > 0) {
          score += occurrences * 10;
          matches.push({ field: 'content', text: para.substring(0, 200) });
        }
      });
    }
    
    // Search in full content
    if (page.content && page.content.toLowerCase().includes(query)) {
      const occurrences = (page.content.toLowerCase().match(new RegExp(query, 'g')) || []).length;
      score += occurrences * 5;
    }
    
    // Search in keywords
    if (page.keywords) {
      page.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(query)) {
          score += 15;
        }
      });
    }
    
    // Generate snippet
    let snippet = '';
    if (matches.length > 0) {
      snippet = matches[0].text;
      if (snippet.length > 150) snippet = snippet.substring(0, 150) + '...';
    } else if (page.content) {
      const index = page.content.toLowerCase().indexOf(query);
      if (index !== -1) {
        const start = Math.max(0, index - 60);
        const end = Math.min(page.content.length, index + query.length + 60);
        snippet = (start > 0 ? '...' : '') + page.content.substring(start, end) + (end < page.content.length ? '...' : '');
      }
    }
    
    return {
      ...page,
      score,
      snippet: snippet || page.content?.substring(0, 150) + '...',
      matches: matches
    };
  })
  .filter(result => result.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 20);
  
  if (results.length === 0) {
    showNoResultsModal(query);
  } else {
    showResultsModal(results, query);
  }
}

function showResultsModal(results, query) {
  // Remove existing modal
  const existingModal = document.querySelector('.search-modal');
  if (existingModal) existingModal.remove();
  
  const modal = document.createElement('div');
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal-overlay"></div>
    <div class="search-modal-container">
      <div class="search-modal-header">
        <h3>Search Results</h3>
        <button class="search-modal-close">&times;</button>
      </div>
      <div class="search-modal-stats">
        Found ${results.length} result${results.length !== 1 ? 's' : ''} for "<strong>${escapeHtml(query)}</strong>"
      </div>
      <div class="search-modal-results">
        ${results.map(result => `
          <a href="${result.url}" class="search-result-card">
            <div class="result-card-title">${highlightText(result.title, query)}</div>
            <div class="result-card-category">${result.headings?.[0] || 'Page'}</div>
            <div class="result-card-snippet">${highlightText(result.snippet, query)}</div>
            <div class="result-card-url">${result.url}</div>
          </a>
        `).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.querySelector('.search-modal-close').onclick = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
  modal.querySelector('.search-modal-overlay').onclick = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
}

function showNoResultsModal(query) {
  const modal = document.createElement('div');
  modal.className = 'search-modal';
  modal.innerHTML = `
    <div class="search-modal-overlay"></div>
    <div class="search-modal-container">
      <div class="search-modal-header">
        <h3>Search Results</h3>
        <button class="search-modal-close">&times;</button>
      </div>
      <div class="search-no-results">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h4>No results found for "${escapeHtml(query)}"</h4>
        <p>Try different keywords or check your spelling</p>
        <ul>
          <li>Make sure all words are spelled correctly</li>
          <li>Try more general terms</li>
          <li>Try different keywords</li>
        </ul>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  modal.querySelector('.search-modal-close').onclick = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
  modal.querySelector('.search-modal-overlay').onclick = () => {
    modal.remove();
    document.body.style.overflow = '';
  };
}

function saveToRecentSearches(query) {
  let recent = [];
  try {
    recent = JSON.parse(localStorage.getItem('bcwd_recent_searches') || '[]');
  } catch(e) {}
  
  recent = recent.filter(s => s !== query);
  recent.unshift(query);
  recent = recent.slice(0, 10);
  
  localStorage.setItem('bcwd_recent_searches', JSON.stringify(recent));
}

function showRecentSearches() {
  let recent = [];
  try {
    recent = JSON.parse(localStorage.getItem('bcwd_recent_searches') || '[]');
  } catch(e) {}
  
  if (recent.length === 0) return;
  
  const dropdown = document.querySelector('.search-dropdown') || createDropdown();
  
  dropdown.innerHTML = `
    <div class="search-dropdown-header">
      <strong>Recent Searches</strong>
      <button class="clear-recent">Clear all</button>
    </div>
    ${recent.map(search => `
      <div class="search-dropdown-item recent-item" data-search="${escapeHtml(search)}">
        🔍 ${escapeHtml(search)}
      </div>
    `).join('')}
  `;
  dropdown.style.display = 'block';
  
  dropdown.querySelectorAll('.recent-item').forEach(item => {
    item.onclick = () => {
      const searchInput = document.getElementById('site-search');
      if (searchInput) {
        searchInput.value = item.dataset.search;
        performSearch(item.dataset.search);
      }
    };
  });
  
  const clearBtn = dropdown.querySelector('.clear-recent');
  if (clearBtn) {
    clearBtn.onclick = (e) => {
      e.stopPropagation();
      localStorage.removeItem('bcwd_recent_searches');
      showRecentSearches();
    };
  }
}

function createDropdown() {
  const searchContainer = document.querySelector('.navbar__search');
  let dropdown = document.querySelector('.search-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(dropdown);
  }
  return dropdown;
}

function hideDropdown() {
  const dropdown = document.querySelector('.search-dropdown');
  if (dropdown) {
    dropdown.style.display = 'none';
  }
}

function showNotification(message, type) {
  const notif = document.createElement('div');
  notif.className = `search-notification search-notification-${type}`;
  notif.textContent = message;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 10);
  setTimeout(() => {
    notif.classList.remove('show');
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

function getFallbackIndex() {
  // Fallback pages
  return [
    {
      url: "index.html",
      title: "Home",
      content: "Butuan City Water District official website water services",
      paragraphs: ["Welcome to BCWD"],
      headings: ["Home"],
      keywords: ["home", "bcwd", "water"]
    }
  ];
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const searchContainer = document.querySelector('.navbar__search');
  const dropdown = document.querySelector('.search-dropdown');
  if (searchContainer && dropdown && !searchContainer.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initUniversalSearch, 1000);
});
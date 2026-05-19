/**
 * Automatic Search Indexer
 * Discovers and indexes all pages on your website
 */

class AutoSearchIndexer {
  constructor() {
    this.searchIndex = [];
    this.isIndexing = false;
    this.indexedUrls = new Set();
    this.init();
  }

  async init() {
    console.log('🔍 Auto Search Indexer starting...');
    
    // Get current page URL as base
    this.baseUrl = window.location.origin + window.location.pathname.split('/').slice(0, -1).join('/');
    
    // List of all pages to index (from your site structure)
    const pagesToIndex = [
      'index.html',
      'about.html',
      'awas.html',
      'awas-login.html',
      'awas-signup.html',
      'awas-payment.html',
      'awas-bill-inquiry.html',
      'awas-calculator.html',
      'awas-connection.html',
      'awas-ebill.html',
      'awas-faq.html',
      'bidding.html',
      'watershed.html',
      'breakwater.html',
      'news.html',
      'news-article.html',
      'publications.html',
      'transparency-seal.html',
      'water-rates.html',
      'lab-charges.html'
    ];
    
    // Also find any HTML files from navigation links
    await this.discoverPagesFromNav();
    
    // Add manual pages
    for (const page of pagesToIndex) {
      if (!this.indexedUrls.has(page)) {
        this.indexedUrls.add(page);
      }
    }
    
    // Index all discovered pages
    await this.indexAllPages();
    
    // Save to localStorage for fast access
    this.saveToLocalStorage();
    
    console.log(`✅ Indexed ${this.searchIndex.length} pages`);
  }

  async discoverPagesFromNav() {
    // Find all links in navigation
    const navLinks = document.querySelectorAll('.navbar__nav a, .navbar__brand a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.endsWith('.html') && !this.indexedUrls.has(href)) {
        this.indexedUrls.add(href);
      }
    });
  }

  async indexAllPages() {
    const depth = window.location.pathname.split('/').filter(Boolean).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    for (const url of this.indexedUrls) {
      try {
        console.log(`Indexing: ${url}`);
        const fullUrl = prefix + url;
        const response = await fetch(fullUrl);
        
        if (!response.ok) continue;
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract title
        let title = doc.querySelector('title')?.textContent || '';
        title = this.cleanText(title);
        
        // Extract all text content from body (excluding scripts, styles, nav, footer)
        const mainContent = doc.querySelector('main') || doc.querySelector('.main-content') || doc.body;
        
        // Clone to avoid modifying original
        const contentClone = mainContent.cloneNode(true);
        
        // Remove unwanted elements
        const removeSelectors = ['script', 'style', 'nav', 'footer', '.navbar', '.navbar__nav', 'header', '.search-results', '.search-modal'];
        removeSelectors.forEach(selector => {
          contentClone.querySelectorAll(selector).forEach(el => el.remove());
        });
        
        // Get text content
        let content = contentClone.textContent || '';
        content = this.cleanText(content);
        
        // Extract meta description
        let description = '';
        const metaDesc = doc.querySelector('meta[name="description"]');
        if (metaDesc) description = metaDesc.getAttribute('content');
        
        // Extract headings for better context
        const headings = [];
        doc.querySelectorAll('h1, h2, h3').forEach(h => {
          headings.push(this.cleanText(h.textContent));
        });
        
        // Extract paragraph text
        const paragraphs = [];
        doc.querySelectorAll('p, li, .content').forEach(p => {
          const text = this.cleanText(p.textContent);
          if (text.length > 20) paragraphs.push(text);
        });
        
        // Generate keywords from content
        const keywords = this.extractKeywords(title + ' ' + content);
        
        this.searchIndex.push({
          url: url,
          title: title,
          description: description,
          content: content.substring(0, 5000), // Limit content size
          headings: headings,
          paragraphs: paragraphs.slice(0, 10),
          keywords: keywords,
          lastIndexed: new Date().toISOString()
        });
        
      } catch (error) {
        console.warn(`Could not index ${url}:`, error);
      }
    }
  }

  cleanText(text) {
    return text
      .replace(/\s+/g, ' ')
      .replace(/[^\w\s\u4e00-\u9fff]/g, ' ')
      .trim()
      .toLowerCase();
  }

  extractKeywords(text) {
    // Remove common words
    const stopWords = new Set(['the', 'and', 'for', 'to', 'of', 'a', 'in', 'is', 'on', 'at', 'by', 'with', 'from', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'an', 'this', 'that', 'these', 'those', 'it', 'its', 'we', 'they', 'our', 'their', 'your', 'my', 'his', 'her', 'what', 'which', 'who', 'whom', 'where', 'when', 'why', 'how', 'can', 'could', 'would', 'should', 'will', 'may', 'might', 'must', 'not', 'no', 'but', 'so', 'or', 'as', 'like', 'such', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'over', 'again', 'further', 'then', 'once', 'here', 'there', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'than', 'then', 'too', 'very', 'just', 'but', 'do', 'does', 'did', 'doing']);
    
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq = new Map();
    
    words.forEach(word => {
      if (word.length > 2 && !stopWords.has(word)) {
        wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
      }
    });
    
    // Get top keywords
    const keywords = Array.from(wordFreq.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(entry => entry[0]);
    
    return keywords;
  }

  saveToLocalStorage() {
    try {
      localStorage.setItem('bcwd_search_index', JSON.stringify({
        version: '1.0',
        timestamp: Date.now(),
        pages: this.searchIndex
      }));
      console.log(`✅ Search index saved to localStorage (${this.searchIndex.length} pages)`);
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  getSearchIndex() {
    return this.searchIndex;
  }
}

// Start indexing immediately
const indexer = new AutoSearchIndexer();
window.searchIndexer = indexer;
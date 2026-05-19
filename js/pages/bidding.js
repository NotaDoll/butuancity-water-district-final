const tabs    = document.querySelectorAll('.filter-tab');
const rows    = document.querySelectorAll('#bidding-tbody tr');
const search  = document.getElementById('doc-search');
const empty   = document.getElementById('bidding-empty');

function filterTable() {
  const activeTab   = document.querySelector('.filter-tab.is-active');
  const activeFilter = activeTab?.dataset.filter || 'all';
  const query        = search?.value.toLowerCase().trim() || '';
  let   visible      = 0;

  rows.forEach(row => {
    const type    = row.dataset.type || '';
    const text    = row.textContent.toLowerCase();
    const matchesFilter = activeFilter === 'all' || type === activeFilter;
    const matchesSearch = text.includes(query);

    if (matchesFilter && matchesSearch) {
      row.style.display = '';
      visible++;
    } else {
      row.style.display = 'none';
    }
  });

  empty.style.display = visible === 0 ? 'block' : 'none';
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => {
      t.classList.remove('is-active');
      t.setAttribute('aria-pressed', 'false');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-pressed', 'true');
    filterTable();
  });
});

search?.addEventListener('input', filterTable);
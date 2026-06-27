// ==========================================
// STATE
// ==========================================
let allTeamMembers = [];
let currentFilter = 'all';
let currentSearch = '';

// ==========================================
// DOM ELEMENTS
// ==========================================
const teamGrid = document.getElementById('teamGrid');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const filterGroup = document.getElementById('filterGroup');
const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const resetFiltersBtn = document.getElementById('resetFilters');

// ==========================================
// FETCH DATA FROM JSON
// ==========================================
async function fetchTeamData() {
  try {
    const response = await fetch('team.json');
    if (!response.ok) throw new Error('Failed to fetch team data');
    const data = await response.json();
    allTeamMembers = data.team;
    buildFilters();
    renderTeam();
  } catch (error) {
    console.error('Error loading team data:', error);
    teamGrid.innerHTML = `
      <p style="text-align:center;color:var(--text-secondary);padding:3rem;">
        <i class="fas fa-exclamation-circle" style="font-size:2rem;display:block;margin-bottom:1rem;"></i>
        Failed to load team data. Please try again later.
      </p>
    `;
  }
}

// ==========================================
// BUILD FILTER BUTTONS
// ==========================================
function buildFilters() {
  // Get unique roles
  const roles = [...new Set(allTeamMembers.map(m => m.role))].sort();

  // Clear existing buttons (keep "All")
  filterGroup.innerHTML = '';

  // "All" button
  const allBtn = document.createElement('button');
  allBtn.className = `filter-btn ${currentFilter === 'all' ? 'active' : ''}`;
  allBtn.dataset.filter = 'all';
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => setFilter('all'));
  filterGroup.appendChild(allBtn);

  // Role buttons
  roles.forEach(role => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${currentFilter === role ? 'active' : ''}`;
    btn.dataset.filter = role;
    btn.textContent = role;
    btn.addEventListener('click', () => setFilter(role));
    filterGroup.appendChild(btn);
  });
}

// ==========================================
// SET FILTER
// ==========================================
function setFilter(filter) {
  currentFilter = filter;

  // Update active class on buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  renderTeam();
}

// ==========================================
// GET FILTERED TEAM
// ==========================================
function getFilteredTeam() {
  const search = currentSearch.toLowerCase().trim();

  return allTeamMembers.filter(member => {
    const matchesFilter = currentFilter === 'all' || member.role === currentFilter;
    const matchesSearch = !search || member.name.toLowerCase().includes(search);
    return matchesFilter && matchesSearch;
  });
}

// ==========================================
// RENDER TEAM CARDS
// ==========================================
function renderTeam() {
  const filtered = getFilteredTeam();

  // Show/hide empty state
  if (filtered.length === 0) {
    teamGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  teamGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  // Clear and rebuild
  teamGrid.innerHTML = '';
  filtered.forEach((member, index) => {
    teamGrid.appendChild(createCard(member, index));
  });
}

// ==========================================
// CREATE SINGLE CARD
// ==========================================
function createCard(member, index) {
  const card = document.createElement('div');
  card.className = 'team-card';
  card.style.animationDelay = `${index * 0.08}s`;

  const imageUrl = member.image_url || 'https://picsum.photos/seed/default/200/200.jpg';

  card.innerHTML = `
    <img class="team-card-image" src="${imageUrl}" alt="${member.name}" loading="lazy">
    <h3>${member.name}</h3>
    <span class="role">${member.role}</span>
    <p class="bio">${member.bio}</p>
    <div class="social-links">
      ${member.social_links.github ? `<a href="${member.social_links.github}" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>` : ''}
      ${member.social_links.linkedin ? `<a href="${member.social_links.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>` : ''}
      ${member.social_links.twitter ? `<a href="${member.social_links.twitter}" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-x-twitter"></i></a>` : ''}
    </div>
  `;

  // Click to open modal
  card.addEventListener('click', () => openModal(member));

  return card;
}

// ==========================================
// MODAL
// ==========================================
function openModal(member) {
  const imageUrl = member.image_url || 'https://picsum.photos/seed/default/400/400.jpg';

  modalBody.innerHTML = `
    <img class="modal-image" src="${imageUrl}" alt="${member.name}" loading="lazy">
    <h2>${member.name}</h2>
    <span class="modal-role">${member.role}</span>
    <p class="modal-bio">${member.bio}</p>
    <div class="modal-socials">
      ${member.social_links.github ? `<a href="${member.social_links.github}" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>` : ''}
      ${member.social_links.linkedin ? `<a href="${member.social_links.linkedin}" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i> LinkedIn</a>` : ''}
      ${member.social_links.twitter ? `<a href="${member.social_links.twitter}" target="_blank" rel="noopener"><i class="fab fa-x-twitter"></i> Twitter</a>` : ''}
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Modal events
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
    closeModal();
  }
});

// ==========================================
// SEARCH
// ==========================================
searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value;
  searchClear.style.display = currentSearch ? 'flex' : 'none';
  renderTeam();
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  searchClear.style.display = 'none';
  searchInput.focus();
  renderTeam();
});

// ==========================================
// RESET FILTERS
// ==========================================
resetFiltersBtn.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  currentFilter = 'all';
  searchClear.style.display = 'none';
  renderTeam();

  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === 'all');
  });
});

// ==========================================
// INIT
// ==========================================
fetchTeamData();
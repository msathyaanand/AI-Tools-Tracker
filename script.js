// Sample AI Tools Data
const defaultTools = [
  {
    id: 1,
    name: 'ChatGPT',
    category: 'writing',
    description: 'Advanced conversational AI for writing, coding, and problem-solving with natural language understanding.',
    url: 'https://chat.openai.com',
    icon: '💬',
    rating: 4.8,
    totalVotes: 124,
    upvotes: 450,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30, // 30 days ago
    risingScore: 85
  },
  {
    id: 2,
    name: 'Midjourney',
    category: 'image',
    description: 'Transform text descriptions into stunning, artistic images using AI-powered image generation.',
    url: 'https://midjourney.com',
    icon: '🎨',
    rating: 4.9,
    totalVotes: 89,
    upvotes: 380,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 25,
    risingScore: 92
  },
  {
    id: 3,
    name: 'GitHub Copilot',
    category: 'coding',
    description: 'AI pair programmer that helps you write code faster with intelligent code completions and suggestions.',
    url: 'https://github.com/features/copilot',
    icon: '👨‍💻',
    rating: 4.7,
    totalVotes: 156,
    upvotes: 620,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 40,
    risingScore: 78
  },
  {
    id: 4,
    name: 'Notion AI',
    category: 'productivity',
    description: 'AI-powered workspace that helps you write, brainstorm, and organize your work more efficiently.',
    url: 'https://notion.so',
    icon: '📝',
    rating: 4.6,
    totalVotes: 78,
    upvotes: 210,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
    risingScore: 88
  },
  {
    id: 5,
    name: 'Runway',
    category: 'video',
    description: 'Create and edit videos with AI tools including text-to-video and advanced editing features.',
    url: 'https://runwayml.com',
    icon: '🎬',
    rating: 4.8,
    totalVotes: 64,
    upvotes: 340,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
    risingScore: 95
  },
  {
    id: 6,
    name: 'Perplexity AI',
    category: 'research',
    description: 'AI-powered search engine that provides accurate answers with cited sources for research and learning.',
    url: 'https://perplexity.ai',
    icon: '🔍',
    rating: 4.7,
    totalVotes: 92,
    upvotes: 410,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
    risingScore: 82
  },
  {
    id: 7,
    name: 'ElevenLabs',
    category: 'audio',
    description: 'Generate realistic AI voices and speech with advanced text-to-speech technology.',
    url: 'https://elevenlabs.io',
    icon: '🎙️',
    rating: 4.9,
    totalVotes: 110,
    upvotes: 530,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
    risingScore: 98
  },
  {
    id: 8,
    name: 'Canva AI',
    category: 'design',
    description: 'Design platform with AI-powered tools for creating graphics, presentations, and visual content.',
    url: 'https://canva.com',
    icon: '✨',
    rating: 4.5,
    totalVotes: 85,
    upvotes: 290,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
    risingScore: 70
  },
  {
    id: 9,
    name: 'Jasper',
    category: 'writing',
    description: 'AI content platform for creating high-quality marketing copy, blog posts, and creative content.',
    url: 'https://jasper.ai',
    icon: '✍️',
    rating: 4.4,
    totalVotes: 72,
    upvotes: 180,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 50,
    risingScore: 65
  }
];

// Admin Credentials (in production, use proper backend authentication)
const ADMIN_CREDENTIALS = {
  username: 'Sathya',
  password: 'Sathya@10'
};

// State Management
let tools = [];
let filteredTools = [];
let isAuthenticated = false;
let isShortlistFilterActive = false;
let currentShortlistType = 'try-later';
let activeShortlistToolId = null;

// DOM Elements
const toolsGrid = document.getElementById('toolsGrid');
const emptyState = document.getElementById('emptyState');
const addToolBtn = document.getElementById('addToolBtn');
const addToolModal = document.getElementById('addToolModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addToolForm = document.getElementById('addToolForm');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const shortlistToggleBtn = document.getElementById('shortlistToggleBtn');
const header = document.getElementById('header');

// Authentication DOM Elements
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModalBtn = document.getElementById('closeLoginModalBtn');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const adminSection = document.getElementById('adminSection');

// Theme DOM Elements
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

// Modal Edit Elements
const addToolModalTitle = document.getElementById('addToolModalTitle');
const addToolSubmitBtn = document.getElementById('addToolSubmitBtn');
const toolEditIdField = document.getElementById('toolEditId');

// Shortlist DOM Elements
const shortlistModal = document.getElementById('shortlistModal');
const closeShortlistModalBtn = document.getElementById('closeShortlistModalBtn');
const shortlistOptions = document.getElementById('shortlistOptions');



// Initialize App
function initApp() {
  // Check authentication status
  checkAuthStatus();

  // Initialize Theme
  initTheme();

  // Load tools from localStorage or use defaults
  const savedTools = localStorage.getItem('aiTools');
  tools = savedTools ? JSON.parse(savedTools) : defaultTools;
  filteredTools = [...tools];

  renderTools();
  setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
  // Tool Management
  addToolBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  addToolModal.addEventListener('click', (e) => {
    if (e.target === addToolModal) closeModal();
  });
  addToolForm.addEventListener('submit', handleAddTool);

  // Authentication
  loginBtn.addEventListener('click', openLoginModal);
  logoutBtn.addEventListener('click', handleLogout);
  closeLoginModalBtn.addEventListener('click', closeLoginModal);
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) closeLoginModal();
  });
  loginForm.addEventListener('submit', handleLogin);

  // Shortlist Modal
  closeShortlistModalBtn.addEventListener('click', closeShortlistModal);
  shortlistModal.addEventListener('click', (e) => {
    if (e.target === shortlistModal) closeShortlistModal();
  });
  shortlistOptions.addEventListener('click', handleShortlistSelection);
  shortlistToggleBtn.addEventListener('click', toggleShortlistFilter);

  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Search, Filter and Sort
  searchInput.addEventListener('input', handleSearch);
  categoryFilter.addEventListener('change', handleFilter);
  sortFilter.addEventListener('change', handleFilter);
  window.addEventListener('scroll', handleScroll);

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (addToolModal.classList.contains('active')) closeModal();
      if (loginModal.classList.contains('active')) closeLoginModal();
      if (shortlistModal.classList.contains('active')) closeShortlistModal();
    }
  });
}

// Render Tools
function renderTools() {
  toolsGrid.innerHTML = '';

  if (filteredTools.length === 0) {
    toolsGrid.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  toolsGrid.style.display = 'grid';
  emptyState.style.display = 'none';

  filteredTools.forEach((tool, index) => {
    const toolCard = createToolCard(tool, index);
    toolsGrid.appendChild(toolCard);
  });
}

// Create Tool Card
function createToolCard(tool, index) {
  const card = document.createElement('div');
  card.className = 'tool-card';
  card.style.animationDelay = `${index * 0.05}s`;

  // Check user actions
  const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
  const userUpvotes = JSON.parse(localStorage.getItem('userUpvotes') || '[]');
  const shortlists = JSON.parse(localStorage.getItem('shortlists') || '{}');

  const hasRated = userVotes[tool.id];
  const hasUpvoted = userUpvotes.includes(tool.id);
  const isBookmarked = Object.values(shortlists).flat().includes(tool.id);

  // Star Rating UI
  const starsUI = Array.from({ length: 5 }, (_, i) => {
    const starValue = i + 1;
    const isFilled = starValue <= Math.round(tool.rating || 0);
    return `<span class="star ${isFilled ? 'filled' : ''}" data-tool-id="${tool.id}" data-value="${starValue}">★</span>`;
  }).join('');

  // Admin actions
  const adminActions = isAuthenticated ? `
    <button class="edit-tool-btn" onclick="handleEditTool(${tool.id})" aria-label="Edit tool" title="Edit Tool">
      ✏️
    </button>
    <button class="tool-action-btn" onclick="deleteTool(${tool.id})" aria-label="Delete tool" title="Delete Tool">
      🗑️
    </button>
  ` : '';

  card.innerHTML = `
    <div class="tool-header">
      <div class="tool-icon">${tool.icon || '🤖'}</div>
      <div class="tool-info">
        <h3 class="tool-name">${tool.name}</h3>
        <span class="tool-category">${tool.category}</span>
      </div>
      <div class="card-top-actions">
        <button class="bookmark-btn ${isBookmarked ? 'active' : ''}" onclick="openShortlistModal(${tool.id})" aria-label="Bookmark">
          ${isBookmarked ? '🔖' : '📑'}
        </button>
      </div>
    </div>
    <p class="tool-description">${tool.description}</p>
    
    <div class="rating-container">
      <div class="rating-header">
        <div class="rating-avg">
          <span>★</span> ${tool.rating ? tool.rating.toFixed(1) : '0.0'}
        </div>
        ${hasRated ? '<span class="voted-badge">Voted</span>' : '<span class="rating-text">Rate this:</span>'}
      </div>
      <div class="stars ${hasRated ? 'voted' : ''}" onclick="handleStarClick(event)">
        ${starsUI}
      </div>
    </div>

    <div class="tool-footer">
      <div class="tool-stats">
        <button class="upvote-btn ${hasUpvoted ? 'voted' : ''}" onclick="handleUpvote(${tool.id})">
          <span>▲</span>
          <span class="upvote-count">${tool.upvotes || 0}</span>
        </button>
      </div>
      <div class="tool-actions">
        <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="tool-link">
          Visit →
        </a>
        ${adminActions}
      </div>
    </div>
  `;

  return card;
}

// Modal Functions
function openModal() {
  addToolModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  addToolModal.classList.remove('active');
  document.body.style.overflow = '';
  addToolForm.reset();
  toolEditIdField.value = '';
  addToolModalTitle.textContent = 'Add New AI Tool';
  addToolSubmitBtn.textContent = 'Add Tool';
}

// Handle Add/Edit Tool
function handleAddTool(e) {
  e.preventDefault();

  const editId = toolEditIdField.value;
  const toolData = {
    name: document.getElementById('toolName').value,
    category: document.getElementById('toolCategory').value,
    description: document.getElementById('toolDescription').value,
    url: document.getElementById('toolUrl').value,
    icon: document.getElementById('toolIcon').value || '🤖'
  };

  if (editId) {
    // Edit existing tool
    const index = tools.findIndex(t => t.id === parseInt(editId));
    if (index !== -1) {
      tools[index] = { ...tools[index], ...toolData };
    }
  } else {
    // Add new tool
    const newTool = {
      id: Date.now(),
      ...toolData,
      rating: 0,
      totalVotes: 0,
      upvotes: 0,
      createdAt: Date.now(),
      risingScore: 50
    };
    tools.unshift(newTool);
  }

  saveTools();
  applyFilters();
  closeModal();

  if (!editId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function handleEditTool(id) {
  const tool = tools.find(t => t.id === id);
  if (!tool) return;

  // Fill modal
  toolEditIdField.value = tool.id;
  document.getElementById('toolName').value = tool.name;
  document.getElementById('toolCategory').value = tool.category;
  document.getElementById('toolDescription').value = tool.description;
  document.getElementById('toolUrl').value = tool.url;
  document.getElementById('toolIcon').value = tool.icon;

  // Change modal UI
  addToolModalTitle.textContent = 'Edit Tool';
  addToolSubmitBtn.textContent = 'Save Changes';

  openModal();
}

// Delete Tool (Admin Only)
function deleteTool(id) {
  if (!isAuthenticated) {
    alert('You must be logged in as admin to delete tools.');
    return;
  }

  if (confirm('Are you sure you want to delete this tool?')) {
    tools = tools.filter(tool => tool.id !== id);
    saveTools();
    applyFilters();
  }
}

// Rating Functions
function handleStarClick(e) {
  if (!e.target.classList.contains('star')) return;

  const toolId = parseInt(e.target.dataset.toolId);
  const ratingValue = parseInt(e.target.dataset.value);

  // Check if user already voted
  const userVotes = JSON.parse(localStorage.getItem('userVotes') || '{}');
  if (userVotes[toolId]) {
    alert('You have already rated this tool!');
    return;
  }

  // Update tool rating
  const toolIndex = tools.findIndex(t => t.id === toolId);
  if (toolIndex !== -1) {
    const tool = tools[toolIndex];
    const currentTotalRating = (tool.rating || 0) * (tool.totalVotes || 0);
    tool.totalVotes = (tool.totalVotes || 0) + 1;
    tool.rating = (currentTotalRating + ratingValue) / tool.totalVotes;

    // Save vote to prevent multiple votes
    userVotes[toolId] = ratingValue;
    localStorage.setItem('userVotes', JSON.stringify(userVotes));

    saveTools();
    renderTools(); // Re-render to show updated rating
  }
}

// Search Functionality
function handleSearch() {
  applyFilters();
}

// Filter Functionality
function handleFilter() {
  applyFilters();
}

// Apply Filters and Sorting
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;
  const sortValue = sortFilter.value;

  // Get shortlisted IDs if filter is active
  const shortlists = JSON.parse(localStorage.getItem('shortlists') || '{}');
  const allShortlistedIds = [].concat(...Object.values(shortlists));

  filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm);
    const matchesCategory = categoryValue === 'all' || tool.category === categoryValue;
    const matchesShortlist = !isShortlistFilterActive || allShortlistedIds.includes(tool.id);

    return matchesSearch && matchesCategory && matchesShortlist;
  });

  // Sorting Logic
  switch (sortValue) {
    case 'upvotes':
      filteredTools.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
      break;
    case 'loved':
      // Simulated: Highest rating with most votes
      filteredTools.sort((a, b) => ((b.rating || 0) * (b.totalVotes || 0)) - ((a.rating || 0) * (a.totalVotes || 0)));
      break;
    case 'rising':
      filteredTools.sort((a, b) => (b.risingScore || 0) - (a.risingScore || 0));
      break;
    case 'underrated':
      // Simulated: High rating but fewer upvotes/total votes
      filteredTools.sort((a, b) => ((b.rating || 0) / ((b.upvotes || 1) / 100)) - ((a.rating || 0) / ((a.upvotes || 1) / 100)));
      break;
    case 'newest':
    default:
      filteredTools.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      break;
  }

  renderTools();
}

// Save Tools to localStorage
function saveTools() {
  localStorage.setItem('aiTools', JSON.stringify(tools));
}

// Handle Scroll for Header
function handleScroll() {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

// Authentication Functions
function checkAuthStatus() {
  const authStatus = localStorage.getItem('isAdminAuthenticated');
  isAuthenticated = authStatus === 'true';
  updateUIForAuthStatus();
}

function updateUIForAuthStatus() {
  if (isAuthenticated) {
    loginBtn.style.display = 'none';
    adminSection.style.display = 'flex';
  } else {
    loginBtn.style.display = 'flex';
    adminSection.style.display = 'none';
  }
}

function openLoginModal() {
  loginModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  loginError.style.display = 'none';
}

function closeLoginModal() {
  loginModal.classList.remove('active');
  document.body.style.overflow = '';
  loginForm.reset();
  loginError.style.display = 'none';
}

function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    isAuthenticated = true;
    localStorage.setItem('isAdminAuthenticated', 'true');
    updateUIForAuthStatus();
    closeLoginModal();

    // Re-render tools to show delete buttons
    renderTools();
  } else {
    loginError.textContent = '❌ Invalid username or password. Please try again.';
    loginError.style.display = 'block';
  }
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    isAuthenticated = false;
    localStorage.removeItem('isAdminAuthenticated');
    updateUIForAuthStatus();

    // Re-render tools to hide delete buttons
    renderTools();
  }
}

// Shortlist Functions
function openShortlistModal(toolId) {
  activeShortlistToolId = toolId;
  shortlistModal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Highlight currently active list for this tool
  const shortlists = JSON.parse(localStorage.getItem('shortlists') || '{}');
  const options = document.querySelectorAll('.shortlist-option');
  options.forEach(opt => {
    const listType = opt.dataset.list;
    if (shortlists[listType] && shortlists[listType].includes(toolId)) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
}

function closeShortlistModal() {
  shortlistModal.classList.remove('active');
  document.body.style.overflow = '';
  activeShortlistToolId = null;
}

function handleShortlistSelection(e) {
  const option = e.target.closest('.shortlist-option');
  if (!option || !activeShortlistToolId) return;

  const listType = option.dataset.list;
  let shortlists = JSON.parse(localStorage.getItem('shortlists') || {
    'try-later': [],
    'for-work': [],
    'favorites': []
  });

  if (!shortlists[listType]) shortlists[listType] = [];

  const index = shortlists[listType].indexOf(activeShortlistToolId);
  if (index > -1) {
    shortlists[listType].splice(index, 1);
    option.classList.remove('active');
  } else {
    shortlists[listType].push(activeShortlistToolId);
    option.classList.add('active');
  }

  localStorage.setItem('shortlists', JSON.stringify(shortlists));
  renderTools();
}

function toggleShortlistFilter() {
  isShortlistFilterActive = !isShortlistFilterActive;
  shortlistToggleBtn.classList.toggle('active');
  applyFilters();
}

// Upvote Function
function handleUpvote(toolId) {
  let userUpvotes = JSON.parse(localStorage.getItem('userUpvotes') || '[]');
  const toolIndex = tools.findIndex(t => t.id === toolId);

  if (toolIndex === -1) return;

  if (userUpvotes.includes(toolId)) {
    // Remove upvote
    userUpvotes = userUpvotes.filter(id => id !== toolId);
    tools[toolIndex].upvotes = (tools[toolIndex].upvotes || 1) - 1;
  } else {
    // Add upvote
    userUpvotes.push(toolId);
    tools[toolIndex].upvotes = (tools[toolIndex].upvotes || 0) + 1;
  }

  localStorage.setItem('userUpvotes', JSON.stringify(userUpvotes));
  saveTools();
  renderTools();
}

// Theme Functions
function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    themeIcon.textContent = '🌙';
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}



// Initialize the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

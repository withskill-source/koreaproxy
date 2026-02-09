// ==================== 게임 페이지 초기화 ====================
document.addEventListener('DOMContentLoaded', () => {
    loadAllGames();
    loadRecommendedGames();
    setupFilters();
    initStats();
});

let allGames = [];
let currentCategory = 'all';

// ==================== 모든 게임 로딩 ====================
async function loadAllGames() {
    const grid = document.getElementById('all-games-grid');
    if (!grid) return;
    
    try {
        const response = await fetch('/api/games');
        allGames = await response.json();
        
        // 전체 게임 수 표시
        const totalGamesEl = document.getElementById('total-games');
        if (totalGamesEl) {
            totalGamesEl.textContent = allGames.length;
        }
        
        displayGames(allGames);
        
    } catch (error) {
        console.error('Failed to load games:', error);
        grid.innerHTML = '<p style="color: #ff0050; text-align: center; grid-column: 1/-1;">Failed to load games. Please refresh.</p>';
    }
}

// ==================== 게임 표시 ====================
function displayGames(games) {
    const grid = document.getElementById('all-games-grid');
    if (!grid) return;
    
    if (games.length === 0) {
        grid.innerHTML = '<p style="color: #666; text-align: center; grid-column: 1/-1;">No games found.</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    games.forEach(game => {
        const card = createGameCard(game);
        grid.appendChild(card);
    });
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'card game-card';
    card.setAttribute('data-category', game.category || 'action');
    card.onclick = () => openGame(game.url, game.name);
    
    card.innerHTML = `
        <div class="game-thumb" style="background-color: ${game.color};">
            ${game.thumbnail}
        </div>
        <span>${game.name}</span>
        <small style="color: #666; font-size: 12px; margin-top: 5px; display: block;">
            ${game.description}
        </small>
        <div class="game-badge">
            <i class="fas fa-play-circle"></i> Play Now
        </div>
    `;
    
    return card;
}

// ==================== 추천 게임 ====================
async function loadRecommendedGames() {
    const grid = document.getElementById('recommended-grid');
    if (!grid) return;
    
    try {
        const response = await fetch('/api/games');
        const games = await response.json();
        
        // 랜덤으로 4개 선택
        const recommended = games.sort(() => 0.5 - Math.random()).slice(0, 4);
        
        grid.innerHTML = '';
        recommended.forEach(game => {
            const card = createGameCard(game);
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Failed to load recommended games:', error);
    }
}

// ==================== 필터 기능 ====================
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 활성 버튼 스타일 변경
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // 카테고리 필터링
            const category = btn.getAttribute('data-category');
            currentCategory = category;
            filterGames(category);
        });
    });
}

function filterGames(category) {
    if (category === 'all') {
        displayGames(allGames);
    } else {
        const filtered = allGames.filter(game => 
            (game.category || 'action') === category
        );
        displayGames(filtered);
    }
}

// ==================== 검색 기능 ====================
function searchGames() {
    const searchInput = document.getElementById('game-search');
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        filterGames(currentCategory);
        return;
    }
    
    const filtered = allGames.filter(game => 
        game.name.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query)
    );
    
    displayGames(filtered);
}

// 실시간 검색
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('game-search');
    if (searchInput) {
        searchInput.addEventListener('input', searchGames);
    }
});

// ==================== 게임 열기 ====================
function openGame(url, name) {
    trackAction('game');
    showNotification(`Loading ${name}...`, 'success');
    window.open(url, '_blank');
}

// ==================== 통계 추적 ====================
async function trackAction(type) {
    try {
        const response = await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type })
        });
        const data = await response.json();
        updateStatsDisplay(data.stats);
    } catch (error) {
        console.error('Failed to track action:', error);
    }
}

async function initStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        updateStatsDisplay(stats);
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}

function updateStatsDisplay(stats) {
    const gameCount = document.getElementById('game-count');
    if (gameCount) {
        gameCount.textContent = stats.gameClicks;
    }
}

// ==================== 알림 시스템 ====================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// CSS 스타일 추가
const style = document.createElement('style');
style.textContent = `
    .games-search-section {
        max-width: 700px;
        margin: 0 auto 30px;
    }
    
    .filter-buttons {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 12px 24px;
        background: var(--bg-card);
        color: var(--text-dim);
        border: 2px solid transparent;
        border-radius: 50px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .filter-btn:hover {
        border-color: var(--primary);
        color: var(--text-main);
    }
    
    .filter-btn.active {
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: #000;
        border-color: transparent;
    }
    
    .filter-btn i {
        font-size: 16px;
    }
    
    .game-badge {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        color: #000;
        padding: 8px;
        font-size: 12px;
        font-weight: 700;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    
    .game-card:hover .game-badge {
        transform: translateY(0);
    }
    
    .games-grid {
        min-height: 400px;
    }
    
    @media (max-width: 768px) {
        .filter-buttons {
            flex-direction: column;
            align-items: stretch;
        }
        
        .filter-btn {
            justify-content: center;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .notification.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .notification-success {
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
    }
    
    .notification-error {
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
    }
    
    .notification-info {
        background: linear-gradient(135deg, #00f2ea, #00c2bd);
        color: #000;
    }
`;
document.head.appendChild(style);

console.log('🎮 Games page initialized!');

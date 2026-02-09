// ==================== 초기화 ====================
document.addEventListener('DOMContentLoaded', () => {
    initStats();
    loadGames();
    setupProxyForm();
    trackVisit();
});

// ==================== 통계 추적 ====================
async function trackVisit() {
    try {
        await fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'visit' })
        });
    } catch (error) {
        console.error('Failed to track visit:', error);
    }
}

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

// ==================== 통계 표시 ====================
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
    const visitCount = document.getElementById('visit-count');
    const proxyCount = document.getElementById('proxy-count');
    const gameCount = document.getElementById('game-count');
    
    if (visitCount) animateNumber(visitCount, stats.visits);
    if (proxyCount) animateNumber(proxyCount, stats.proxyRequests);
    if (gameCount) animateNumber(gameCount, stats.gameClicks);
}

function animateNumber(element, target) {
    const current = parseInt(element.textContent) || 0;
    const increment = Math.ceil((target - current) / 20);
    
    if (current < target) {
        element.textContent = current + increment;
        setTimeout(() => animateNumber(element, target), 50);
    } else {
        element.textContent = target;
    }
}

// ==================== 게임 로딩 ====================
async function loadGames() {
    const gamesGrid = document.getElementById('games-grid');
    if (!gamesGrid) return;
    
    try {
        const response = await fetch('/api/games');
        const games = await response.json();
        
        gamesGrid.innerHTML = '';
        
        // 홈페이지에는 처음 4개만 표시
        const displayGames = games.slice(0, 4);
        
        displayGames.forEach(game => {
            const gameCard = createGameCard(game);
            gamesGrid.appendChild(gameCard);
        });
        
    } catch (error) {
        console.error('Failed to load games:', error);
        gamesGrid.innerHTML = '<p style="color: #ff0050; text-align: center;">Failed to load games. Please refresh.</p>';
    }
}

function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'card game-card';
    card.onclick = () => openGame(game.url, game.name);
    
    card.innerHTML = `
        <div class="game-thumb" style="background-color: ${game.color};">
            ${game.thumbnail}
        </div>
        <span>${game.name}</span>
        <small style="color: #666; font-size: 12px; margin-top: 5px; display: block;">
            ${game.description}
        </small>
    `;
    
    return card;
}

// ==================== 프록시 폼 처리 ====================
function setupProxyForm() {
    const form = document.getElementById('proxy-form');
    const input = document.getElementById('url-input');
    
    if (!form || !input) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let url = input.value.trim();
        
        if (!url) {
            showNotification('Please enter a URL', 'error');
            return;
        }
        
        // URL 형식 확인
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        openProxy(url);
    });
}

// ==================== 프록시 열기 ====================
function openProxy(url) {
    trackAction('proxy');
    
    // 실제 프록시 기능 (현재는 새 탭에서 열기)
    showNotification(`Opening: ${url}`, 'success');
    
    // 방법 1: 새 창에서 열기 (기본)
    window.open(url, '_blank');
    
    // 방법 2: 프록시 서버를 통해 열기 (Ultraviolet 연동 후)
    // window.location.href = `/service/${encodeURIComponent(url)}`;
    
    // 입력창 초기화
    const input = document.getElementById('url-input');
    if (input) input.value = '';
}

// ==================== 게임 열기 ====================
function openGame(url, name) {
    trackAction('game');
    showNotification(`Loading ${name}...`, 'success');
    
    // 게임을 새 탭에서 열기
    window.open(url, '_blank');
}

// ==================== 알림 시스템 ====================
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => notification.classList.add('show'), 10);
    
    // 3초 후 제거
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

// ==================== 유틸리티 함수 ====================
function isValidUrl(string) {
    try {
        new URL(string.startsWith('http') ? string : 'https://' + string);
        return true;
    } catch (_) {
        return false;
    }
}

// ==================== 키보드 단축키 ====================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: 검색창 포커스
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('url-input');
        if (input) input.focus();
    }
});

// ==================== 페이지 가시성 추적 ====================
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 페이지가 다시 보일 때 통계 새로고침
        initStats();
    }
});

// CSS for notifications (동적으로 추가)
const style = document.createElement('style');
style.textContent = `
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
    
    .notification-warning {
        background: linear-gradient(135deg, #f1c40f, #f39c12);
        color: #000;
    }
    
    .notification-info {
        background: linear-gradient(135deg, #00f2ea, #00c2bd);
        color: #000;
    }
    
    .notification i {
        font-size: 20px;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            top: 10px;
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 SwiftAccess initialized!');
console.log('💡 Press Ctrl+K to focus search bar');

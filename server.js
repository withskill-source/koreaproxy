const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 메인 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 게임 페이지 라우트
app.get('/games', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'games.html'));
});

// 기본 프록시 기능 (시연용)
app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).send('URL is required');
    }
    
    // URL 유효성 검사
    try {
        new URL(url.startsWith('http') ? url : 'https://' + url);
        // 실제 환경에서는 여기서 fetch를 사용하여 컨텐츠를 가져옵니다
        res.redirect(url);
    } catch (error) {
        res.status(400).send('Invalid URL');
    }
});

// 프록시 API (AJAX 요청용)
app.post('/api/proxy', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const fetch = require('node-fetch');
        const targetUrl = url.startsWith('http') ? url : 'https://' + url;
        const response = await fetch(targetUrl);
        const html = await response.text();
        
        res.json({ 
            success: true, 
            content: html,
            url: targetUrl
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Failed to fetch URL',
            message: error.message 
        });
    }
});

// 게임 목록 API
app.get('/api/games', (req, res) => {
    const games = [
        {
            id: 1,
            name: 'Minecraft Classic',
            url: 'https://classic.minecraft.net',
            thumbnail: '⛏️',
            color: '#2ecc71',
            description: 'Build and explore in creative mode',
            category: 'action'
        },
        {
            id: 2,
            name: 'Monkeytype',
            url: 'https://monkeytype.com',
            thumbnail: '⌨️',
            color: '#e2b714',
            description: 'Practice your typing speed',
            category: 'typing'
        },
        {
            id: 3,
            name: 'Slither.io',
            url: 'https://slither.io',
            thumbnail: '🐍',
            color: '#8e44ad',
            description: 'Snake battle game',
            category: 'action'
        },
        {
            id: 4,
            name: '2048',
            url: 'https://play2048.co',
            thumbnail: '🔢',
            color: '#f39c12',
            description: 'Classic number puzzle game',
            category: 'puzzle'
        },
        {
            id: 5,
            name: 'Krunker.io',
            url: 'https://krunker.io',
            thumbnail: '🎯',
            color: '#e74c3c',
            description: 'Fast-paced FPS shooter',
            category: 'action'
        },
        {
            id: 6,
            name: 'Shell Shockers',
            url: 'https://shellshock.io',
            thumbnail: '🥚',
            color: '#ff6b6b',
            description: 'Egg shooting game',
            category: 'action'
        }
    ];
    
    res.json(games);
});

// 통계 API (수익화 추적용)
let stats = {
    visits: 0,
    proxyRequests: 0,
    gameClicks: 0
};

app.get('/api/stats', (req, res) => {
    res.json(stats);
});

app.post('/api/track', (req, res) => {
    const { type } = req.body;
    
    switch(type) {
        case 'visit':
            stats.visits++;
            break;
        case 'proxy':
            stats.proxyRequests++;
            break;
        case 'game':
            stats.gameClicks++;
            break;
    }
    
    res.json({ success: true, stats });
});

// 서버 시작
app.listen(port, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║  🚀 SwiftAccess Proxy Server Running!       ║
╚═══════════════════════════════════════════════╝

📡 Server URL: http://localhost:${port}
🎮 Games Page: http://localhost:${port}/games

📊 Stats available at: /api/stats
💰 Ready for monetization!

Press Ctrl+C to stop the server
═══════════════════════════════════════════════
    `);
});

# 🚀 SwiftAccess - Unblocked Web & Games Proxy

> 학교나 회사에서 차단된 웹사이트에 접근하고 게임을 플레이할 수 있는 현대적인 웹 프록시 플랫폼

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ 주요 기능

- 🔓 **웹 프록시**: 차단된 웹사이트 우회 접속
- 🎮 **언블락 게임**: 학교/직장에서 플레이 가능한 게임 모음
- 💰 **수익화**: 광고 통합으로 수익 창출
- 📱 **반응형 디자인**: 모든 기기에서 완벽 작동
- 🌙 **다크 모드**: 눈이 편한 사이버펑크 스타일
- 📊 **실시간 통계**: 방문자 및 사용량 추적
- ⚡ **빠른 속도**: 최적화된 성능

## 🎯 데모

### 홈페이지
- URL 프록시 입력
- 인기 앱 빠른 접속
- 추천 게임
- 통계 대시보드

### 게임 페이지
- 전체 게임 목록
- 검색 및 필터
- 카테고리별 분류

## 🛠️ 기술 스택

**Backend:**
- Node.js + Express
- CORS 지원
- RESTful API

**Frontend:**
- HTML5 / CSS3
- Vanilla JavaScript
- Font Awesome Icons
- Responsive Grid Layout

**광고 플랫폼 (선택):**
- Google AdSense
- PropellerAds
- Adsterra

## 📦 설치 방법

### 1. 저장소 클론 (또는 파일 다운로드)

```bash
# Git을 사용하는 경우
git clone https://github.com/yourusername/swift-proxy.git
cd swift-proxy

# 또는 이 폴더의 파일들을 직접 사용
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 서버 실행

```bash
npm start
```

### 4. 브라우저에서 열기

```
http://localhost:8080
```

## 📁 프로젝트 구조

```
swift-proxy/
├── server.js                 # Express 서버
├── package.json             # 프로젝트 설정
├── public/                  # 정적 파일
│   ├── index.html          # 메인 페이지
│   ├── games.html          # 게임 페이지
│   ├── style.css           # 스타일시트
│   ├── app.js              # 메인 JavaScript
│   └── games.js            # 게임 페이지 스크립트
├── MONETIZATION_GUIDE.md   # 수익화 가이드
└── README.md               # 이 파일
```

## 🎨 커스터마이징

### 색상 변경

`public/style.css`에서 CSS 변수 수정:

```css
:root {
    --primary: #00f2ea;      /* 메인 색상 */
    --secondary: #ff0050;    /* 강조 색상 */
    --bg-dark: #0a0a0a;      /* 배경 */
}
```

### 게임 추가

`server.js`의 게임 목록에 새 게임 추가:

```javascript
{
    id: 7,
    name: '새 게임',
    url: 'https://game-url.com',
    thumbnail: 'NG',
    color: '#e74c3c',
    description: '게임 설명',
    category: 'action'  // action, puzzle, sports
}
```

### 로고 변경

`public/index.html`과 `public/games.html`에서:

```html
<div class="logo-icon">🚀</div>  <!-- 원하는 이모지로 변경 -->
<div class="logo-text">SwiftAccess</div>  <!-- 사이트 이름 변경 -->
```

## 💰 수익화 설정

자세한 내용은 [MONETIZATION_GUIDE.md](MONETIZATION_GUIDE.md)를 참조하세요.

### 빠른 시작

1. **광고 네트워크 선택**
   - Google AdSense (추천)
   - PropellerAds
   - Adsterra

2. **광고 코드 받기**
   - 각 플랫폼에서 가입 후 코드 생성

3. **HTML에 삽입**

```html
<!-- index.html에서 찾기 -->
<div class="ad-placeholder">
    <!-- 여기를 광고 코드로 교체 -->
</div>
```

## 🚀 배포

### Vercel (무료, 추천)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Heroku

```bash
# Heroku CLI로 배포
heroku create your-app-name
git push heroku main
```

### Netlify

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 배포
netlify deploy --prod
```

### Railway

```bash
# Railway CLI 설치
npm install -g @railway/cli

# 배포
railway up
```

## 📊 Analytics 연동

### Google Analytics

```html
<!-- index.html의 <head>에 추가 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🔒 보안 고려사항

1. **HTTPS 사용**: 프로덕션에서는 반드시 HTTPS
2. **Rate Limiting**: DDoS 방지
3. **Content Security Policy**: XSS 공격 방지
4. **입력 검증**: 모든 사용자 입력 검증

## 🐛 문제 해결

### 포트가 이미 사용 중

```bash
# 다른 포트로 실행
PORT=3000 npm start
```

### 광고가 표시되지 않음

1. 광고 차단기 비활성화
2. 광고 코드가 올바른지 확인
3. 도메인이 광고 네트워크에 승인되었는지 확인

### 게임이 로드되지 않음

1. 브라우저 콘솔에서 에러 확인
2. CORS 정책 확인
3. 게임 URL이 유효한지 확인

## 🎯 로드맵

- [ ] Ultraviolet 프록시 엔진 통합
- [ ] 사용자 계정 시스템
- [ ] 게임 즐겨찾기 기능
- [ ] 다크/라이트 모드 전환
- [ ] PWA (Progressive Web App) 지원
- [ ] 다국어 지원
- [ ] 소셜 로그인
- [ ] 게임 평점 시스템

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

## 🤝 기여

프로젝트 개선 아이디어나 버그 리포트 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

- 📧 Email: [your-email@example.com]
- 💬 Discord: [Your Discord Server]
- 🐦 Twitter: [@yourhandle]

## ⚠️ 면책 조항

이 프로젝트는 교육 목적으로 제공됩니다. 사용자는 자신의 학교/직장 정책을 준수할 책임이 있으며, 불법적인 용도로 사용할 수 없습니다.

## 🌟 감사의 말

- [Font Awesome](https://fontawesome.com) - 아이콘
- [Express.js](https://expressjs.com) - 웹 프레임워크
- 모든 기여자들

---

**Made with 💙 by SwiftAccess Team**

⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!

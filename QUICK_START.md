# 🚀 SwiftAccess 빠른 시작 가이드

## ⚡ 5분 안에 시작하기

### 1단계: 필수 프로그램 설치

#### Node.js 설치 (아직 없다면)
- Windows/Mac: https://nodejs.org 에서 LTS 버전 다운로드
- 설치 확인:
```bash
node --version  # v14 이상이어야 함
npm --version
```

### 2단계: 프로젝트 설치

```bash
# 터미널/명령 프롬프트 열기

# 프로젝트 폴더로 이동
cd swift-proxy

# 패키지 설치
npm install
```

### 3단계: 서버 실행

```bash
npm start
```

다음과 같은 메시지가 나타나면 성공:
```
╔═══════════════════════════════════════════════╗
║  🚀 SwiftAccess Proxy Server Running!       ║
╚═══════════════════════════════════════════════╝

📡 Server URL: http://localhost:8080
🎮 Games Page: http://localhost:8080/games
```

### 4단계: 브라우저에서 열기

브라우저에서 접속:
```
http://localhost:8080
```

## 🎯 주요 기능 테스트

### ✅ 홈페이지 확인
- URL 입력창에 웹사이트 주소 입력
- 인기 앱 카드 클릭
- 게임 카드 클릭

### ✅ 게임 페이지 확인
- "View All Games" 버튼 클릭
- 검색 기능 테스트
- 카테고리 필터 테스트

### ✅ 통계 확인
- API 엔드포인트 확인: http://localhost:8080/api/stats
- 통계 바에서 숫자 변화 확인

## 🔧 문제 해결

### ❌ "npm: command not found"
→ Node.js가 설치되지 않음. 1단계 다시 확인

### ❌ "Port 8080 is already in use"
→ 다른 포트로 실행:
```bash
PORT=3000 npm start
```

### ❌ "Cannot find module 'express'"
→ 의존성 재설치:
```bash
rm -rf node_modules
npm install
```

### ❌ 게임이 표시되지 않음
→ 브라우저 콘솔(F12) 확인:
```
1. F12 눌러서 개발자 도구 열기
2. Console 탭 확인
3. 에러 메시지 확인
```

## 💰 광고 설정 (수익화)

### 단계별 가이드

#### 1️⃣ 광고 네트워크 선택
- **초보자 추천**: PropellerAds (승인 빠름)
- **최고 수익**: Google AdSense
- **게임 특화**: Adsterra

#### 2️⃣ 계정 생성 및 승인

**Google AdSense 예시:**
```
1. https://adsense.google.com 방문
2. Google 계정으로 로그인
3. 웹사이트 URL 입력
4. 승인 대기 (1-3일)
```

#### 3️⃣ 광고 코드 받기

승인 후 AdSense에서:
```
1. "Ads" 메뉴 클릭
2. "By ad unit" 선택
3. "Display ads" 클릭
4. 크기 선택 (Responsive 추천)
5. "Create" 클릭
6. 코드 복사
```

#### 4️⃣ 코드 삽입

`public/index.html` 열기:

```html
<!-- 찾기: -->
<div class="ad-placeholder">
    <i class="fas fa-ad"></i>
    <span>Google Ads / PropellerAds Space (728x90)</span>
</div>

<!-- 바꾸기: -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-당신의ID"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-당신의ID"
     data-ad-slot="당신의슬롯번호"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

#### 5️⃣ 모든 광고 위치에 적용

같은 방식으로 다음 위치에도 삽입:
- 상단 광고 (.top-ad)
- 중간 광고 (.mid-ad)
- 하단 광고 (.bottom-ad)
- games.html의 광고 위치들

## 🌐 인터넷에 배포하기

### Vercel (무료, 가장 쉬움)

```bash
# 1. Vercel 계정 생성
https://vercel.com

# 2. Vercel CLI 설치
npm i -g vercel

# 3. 배포
vercel

# 질문에 답변:
# - Set up and deploy? Yes
# - Which scope? (본인 계정 선택)
# - Link to existing project? No
# - Project name? swift-proxy (또는 원하는 이름)
# - Override settings? No

# 완료! URL이 표시됨: https://swift-proxy-xxx.vercel.app
```

### Railway (무료 티어)

```bash
# 1. Railway 계정 생성
https://railway.app

# 2. GitHub 연동
# 3. New Project → Deploy from GitHub
# 4. Repository 선택
# 5. 자동 배포!
```

### Render (무료 티어)

```bash
# 1. Render 계정 생성
https://render.com

# 2. New Web Service
# 3. GitHub repository 연결
# 4. Settings:
#    - Build Command: npm install
#    - Start Command: npm start
# 5. Create Web Service
```

## 📊 Analytics 설정

### Google Analytics

#### 1️⃣ 계정 생성
```
1. https://analytics.google.com 방문
2. 계정 만들기
3. 속성 만들기
4. 측정 ID 받기 (G-XXXXXXXXXX)
```

#### 2️⃣ 코드 추가

`public/index.html`의 `<head>` 태그 안에:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-당신의ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-당신의ID');
</script>
```

#### 3️⃣ 이벤트 추적

이미 구현됨! 다음이 자동 추적됨:
- 페이지 방문
- 프록시 사용
- 게임 클릭

## 🎨 커스터마이징

### 사이트 이름 변경

**변경할 파일들:**
1. `public/index.html`
2. `public/games.html`

```html
<!-- 찾기 -->
<span class="logo-text">SwiftAccess</span>

<!-- 바꾸기 -->
<span class="logo-text">당신의사이트명</span>
```

### 색상 테마 변경

`public/style.css` 최상단:

```css
:root {
    --primary: #00f2ea;      /* 바꾸기: 메인 색상 */
    --secondary: #ff0050;    /* 바꾸기: 강조 색상 */
}
```

**색상 추천:**
- 파란 테마: `--primary: #3498db; --secondary: #2980b9;`
- 초록 테마: `--primary: #2ecc71; --secondary: #27ae60;`
- 보라 테마: `--primary: #9b59b6; --secondary: #8e44ad;`

### 게임 추가하기

`server.js`에서:

```javascript
// 게임 목록 API 찾기 (약 45번째 줄)
app.get('/api/games', (req, res) => {
    const games = [
        // ... 기존 게임들
        
        // 새 게임 추가
        {
            id: 7,
            name: '당신의 게임',
            url: 'https://game-url.com',
            thumbnail: 'YG',
            color: '#e74c3c',
            description: '재미있는 게임 설명',
            category: 'action'  // action, puzzle, sports
        }
    ];
    // ...
});
```

## 📈 트래픽 증가 팁

### SEO 최적화

`public/index.html`의 `<head>`에 추가:

```html
<meta name="description" content="Play unblocked games at school. Free web proxy to access blocked sites.">
<meta name="keywords" content="unblocked games, proxy, school games, free games, unblock sites">

<!-- Open Graph (소셜 미디어) -->
<meta property="og:title" content="SwiftAccess - Unblocked Games & Proxy">
<meta property="og:description" content="Access any website and play games anywhere">
<meta property="og:image" content="https://your-site.com/thumbnail.png">
```

### 홍보 전략

1. **Reddit 포스팅**
   - r/WebGames
   - r/unblocked
   - r/teenagers (조심스럽게)

2. **Discord 서버**
   - 게이밍 커뮤니티
   - 학생 커뮤니티

3. **TikTok/YouTube**
   - "학교에서 게임하는 법"
   - "차단된 사이트 접속하기"

4. **입소문**
   - 친구들에게 공유
   - 학교 그룹챗

## 🔐 보안 강화

### HTTPS 강제

배포 플랫폼에서 자동 제공되지만, 커스텀 도메인 사용 시:

```javascript
// server.js에 추가
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production') {
        res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
        next();
    }
});
```

### Rate Limiting

DDoS 방지:

```bash
npm install express-rate-limit
```

```javascript
// server.js 최상단에 추가
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 100 // 최대 100 요청
});

app.use(limiter);
```

## 💡 Pro Tips

1. **체류 시간 늘리기**
   - 게임 추가
   - 블로그 섹션
   - 커뮤니티 기능

2. **광고 수익 최적화**
   - 광고 3-4개가 최적
   - 너무 많으면 이탈률 증가

3. **SEO 개선**
   - sitemap.xml 생성
   - robots.txt 설정
   - 빠른 로딩 속도

4. **모니터링**
   - Google Analytics 매일 확인
   - 어떤 게임이 인기있는지 분석
   - 광고 CTR 추적

## 🆘 도움말

### 커뮤니티
- GitHub Issues
- Discord 서버
- Reddit r/webdev

### 문서
- [전체 README](README.md)
- [수익화 가이드](MONETIZATION_GUIDE.md)
- [Node.js 공식 문서](https://nodejs.org/docs)

---

**준비됐나요? 🚀**

```bash
npm start
```

**성공적인 런칭을 기원합니다! 🎉**

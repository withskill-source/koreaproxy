# 💰 SwiftAccess 광고 수익화 가이드

## 📋 목차
1. [광고 네트워크 선택](#광고-네트워크-선택)
2. [광고 통합 방법](#광고-통합-방법)
3. [수익 최적화 전략](#수익-최적화-전략)
4. [법적 고려사항](#법적-고려사항)

---

## 🎯 광고 네트워크 선택

### 추천 광고 네트워크 (학생/게임 사이트용)

#### 1. **Google AdSense** (가장 안정적)
- **수익률**: 중-상
- **승인 난이도**: 중
- **장점**: 신뢰도 높음, 자동 광고 최적화
- **단점**: 프록시/게임 사이트 승인 어려울 수 있음
- **적용 위치**: 상단, 하단, 사이드바

**신청 방법**:
```
1. https://adsense.google.com 방문
2. 계정 생성 및 사이트 등록
3. 코드 복사하여 HTML에 붙여넣기
```

#### 2. **PropellerAds** (프록시 사이트 친화적)
- **수익률**: 중
- **승인 난이도**: 쉬움
- **장점**: 빠른 승인, 다양한 광고 형식
- **단점**: 팝업 광고 포함될 수 있음
- **적용 위치**: 전체 페이지

**신청 방법**:
```
1. https://propellerads.com 가입
2. "Add Zone" → "Direct Link" 또는 "Push Notification" 선택
3. 제공된 스크립트 코드 복사
```

#### 3. **Adsterra** (게임 사이트 특화)
- **수익률**: 중-상
- **승인 난이도**: 쉬움
- **장점**: 게임 트래픽에 강함, 높은 CPM
- **단점**: 광고 품질 관리 필요
- **적용 위치**: 배너, 팝언더

#### 4. **AdThrive / Mediavine** (고급 옵션)
- **수익률**: 상
- **승인 난이도**: 어려움 (최소 트래픽 요구)
- **요구사항**: 
  - AdThrive: 월 100,000 페이지뷰
  - Mediavine: 월 50,000 세션
- **장점**: 최고 수익률, 프리미엄 광고주

---

## 🔧 광고 통합 방법

### 1단계: 광고 코드 받기

각 광고 네트워크에서 가입 후 광고 코드를 받습니다.

**예시 - Google AdSense 코드**:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

### 2단계: HTML 파일 수정

**index.html 수정 예시**:

```html
<!-- 기존 코드 찾기 -->
<div class="ad-container top-ad">
    <div class="ad-placeholder">
        <i class="fas fa-ad"></i>
        <span>Google Ads / PropellerAds Space (728x90)</span>
    </div>
</div>

<!-- 아래처럼 변경 -->
<div class="ad-container top-ad">
    <!-- Google AdSense -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="1234567890"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

### 3단계: 여러 광고 위치 설정

#### 📍 상단 배너 (Top Banner)
- **크기**: 728x90 (데스크톱), 320x50 (모바일)
- **위치**: 헤더 아래
- **효과**: 높은 가시성

```html
<div class="ad-container top-ad">
    <!-- 여기에 광고 코드 -->
</div>
```

#### 📍 중간 광고 (Mid-Content Ad)
- **크기**: 반응형
- **위치**: 콘텐츠 중간
- **효과**: 자연스러운 노출

```html
<div class="ad-container mid-ad">
    <!-- 여기에 광고 코드 -->
</div>
```

#### 📍 하단 광고 (Bottom Ad)
- **크기**: 전체 너비
- **위치**: 푸터 위
- **옵션**: Sticky 가능

```html
<div class="ad-container bottom-ad">
    <!-- 여기에 광고 코드 -->
</div>
```

---

## 📊 수익 최적화 전략

### 1. 광고 배치 최적화

**황금률**:
- ✅ 사용자 경험 해치지 않기
- ✅ 콘텐츠와 광고 비율 60:40
- ✅ 첫 화면에 최소 1개 광고
- ❌ 너무 많은 광고 (이탈률 증가)

**최적 배치**:
```
[상단 배너]
   ↓
[콘텐츠 - 앱 바로가기]
   ↓
[중간 광고]
   ↓
[콘텐츠 - 게임 목록]
   ↓
[하단 광고]
```

### 2. 트래픽 증가 전략

#### SEO 최적화
```html
<!-- meta 태그 추가 -->
<meta name="description" content="Play unblocked games at school - Free proxy access">
<meta name="keywords" content="unblocked games, proxy, school games, free games">

<!-- Open Graph 태그 -->
<meta property="og:title" content="SwiftAccess - Unblocked Games">
<meta property="og:description" content="Access blocked sites and play games anywhere">
<meta property="og:image" content="/thumbnail.png">
```

#### 소셜 미디어 공유
- Discord 서버 홍보
- Reddit (r/WebGames, r/unblocked 등)
- TikTok 짧은 영상
- YouTube 튜토리얼

### 3. 사용자 체류 시간 늘리기

```javascript
// 게임 추천 알고리즘 (server.js에 추가)
app.get('/api/recommended', (req, res) => {
    // 사용자가 플레이한 게임 기반 추천
    const userHistory = req.cookies.gameHistory || [];
    const recommended = recommendGames(userHistory);
    res.json(recommended);
});
```

### 4. A/B 테스팅

```javascript
// 광고 배치 테스트
const adVariants = ['top-only', 'top-mid', 'top-mid-bottom'];
const variant = adVariants[Math.floor(Math.random() * adVariants.length)];

// 분석 도구 연동
gtag('event', 'ad_variant', { variant: variant });
```

---

## 💵 예상 수익 계산

### 수익 공식
```
월 수익 = (일일 방문자 수 × 페이지뷰/방문자 × CPM × 광고 수) / 1000 × 30
```

### 예시 시나리오

#### 🏫 학교 사이트 (작은 규모)
- 일일 방문자: 500명
- 페이지뷰/방문자: 3
- CPM: $2
- 광고 수: 3개
- **예상 월 수익**: $270

#### 🎮 인기 게임 사이트 (중간 규모)
- 일일 방문자: 5,000명
- 페이지뷰/방문자: 5
- CPM: $3
- 광고 수: 4개
- **예상 월 수익**: $9,000

#### 🚀 바이럴 사이트 (대규모)
- 일일 방문자: 50,000명
- 페이지뷰/방문자: 8
- CPM: $4
- 광고 수: 5개
- **예상 월 수익**: $240,000

---

## ⚖️ 법적 고려사항

### 주의사항

1. **저작권**
   - 게임 링크만 제공 (직접 호스팅 X)
   - 저작권 있는 게임은 허가 필요

2. **프록시 서비스**
   - 불법 콘텐츠 차단 시스템 필요
   - 이용약관 명시

3. **미성년자 보호**
   - 부적절한 광고 필터링
   - 연령 제한 콘텐츠 차단

### 이용약관 템플릿

```html
<!-- footer.html -->
<div class="legal">
    <h4>이용약관</h4>
    <p>
        본 사이트는 교육 목적으로 제공됩니다. 
        사용자는 자신의 학교/직장 정책을 준수할 책임이 있습니다.
        불법적인 용도로 사용할 수 없습니다.
    </p>
</div>
```

---

## 🎯 실전 체크리스트

### 출시 전 확인사항
- [ ] 광고 네트워크 승인 완료
- [ ] 광고 코드 정상 작동 확인
- [ ] 모바일 반응형 테스트
- [ ] 페이지 로딩 속도 최적화 (<3초)
- [ ] Analytics 연동 (Google Analytics 또는 Plausible)
- [ ] 이용약관 및 개인정보처리방침 작성
- [ ] 백업 시스템 구축

### 첫 달 목표
- [ ] 일일 방문자 100명 달성
- [ ] 평균 체류 시간 3분 이상
- [ ] 이탈률 70% 이하
- [ ] 첫 수익 발생

### 3개월 목표
- [ ] 일일 방문자 1,000명
- [ ] 월 수익 $500+
- [ ] SEO 순위 향상
- [ ] 커뮤니티 구축

---

## 🚀 다음 단계

1. **Ultraviolet 프록시 엔진 통합**
   - 실제 우회 기능 구현
   - https://github.com/titaniumnetwork-dev/Ultraviolet

2. **분석 도구 추가**
   - Google Analytics
   - Hotjar (사용자 행동 분석)

3. **커뮤니티 기능**
   - 댓글 시스템
   - 게임 평점
   - 사용자 추천

4. **프리미엄 기능**
   - 광고 없는 버전 ($2.99/월)
   - VIP 게임 접근권
   - 우선 지원

---

## 📧 도움이 필요하신가요?

- 문서 질문: README.md 참조
- 기술 지원: GitHub Issues
- 비즈니스 문의: [이메일 주소]

**성공을 기원합니다! 🎉**

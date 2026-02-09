# 🚀 Hostinger 배포 완벽 가이드 (최신판)

## 📋 목차
1. [사전 확인](#사전-확인)
2. [Business/Cloud 플랜 배포 (추천)](#businesscloud-플랜-배포)
3. [VPS 플랜 배포](#vps-플랜-배포)
4. [도메인 설정](#도메인-설정)
5. [SEO 최적화 완료](#seo-최적화)

---

## ✅ 사전 확인

### Hostinger 플랜 확인

1. **hPanel 로그인**: https://hpanel.hostinger.com
2. **Hosting** 메뉴에서 플랜 확인

**Node.js 지원 플랜:**
- ✅ Business Hosting
- ✅ Cloud Hosting (모든 단계)
- ✅ VPS Hosting

**미지원 플랜:**
- ❌ Single Hosting
- ❌ Premium Hosting

→ 미지원 플랜이면 **Business 플랜으로 업그레이드** 필요

---

## 🌟 Business/Cloud 플랜 배포 (가장 쉬움!)

### 1단계: GitHub에 코드 업로드 (권장)

```bash
# 프로젝트 폴더에서 실행
cd swift-proxy

# Git 초기화 (처음만)
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "SwiftAccess initial commit"

# GitHub 저장소 생성 후 연결
git remote add origin https://github.com/당신의아이디/swift-proxy.git

# 푸시
git push -u origin main
```

### 2단계: Hostinger에서 배포

1. **hPanel 로그인**: https://hpanel.hostinger.com

2. **Websites** → **Create or migrate a website** 클릭

3. **Node.js Apps** 선택

4. **Deploy from GitHub** 선택
   - "Authorize GitHub" 클릭
   - GitHub 연결 허용
   - 저장소 선택: `swift-proxy`
   - 브랜치 선택: `main`

5. **빌드 설정 확인:**
   ```
   Node.js Version: 18 또는 20 (최신)
   Build Command: npm install
   Start Command: npm start
   Root Directory: /
   Port: 8080
   ```

6. **환경 변수 추가 (선택사항):**
   ```
   NODE_ENV=production
   PORT=8080
   ```

7. **Deploy 버튼 클릭!**

8. **배포 진행 확인** (2-3분 소요)

9. **완료!** 임시 도메인 제공:
   ```
   https://swift-proxy-xxxx.hostingersite.com
   ```

### 3단계: 도메인 연결

임시 도메인 대신 본인 도메인 사용:

1. hPanel → **Domains**
2. 사용할 도메인 선택
3. **Connect to Website**
4. 방금 만든 Node.js 앱 선택
5. 5-10분 후 도메인으로 접속 가능!

---

## 🛠️ VPS 플랜 배포

### 사전 준비

- VPS 플랜 구독됨
- SSH 접속 정보 (hPanel에서 확인)
- 기본 Linux 명령어 지식

### 1단계: SSH 접속

**Windows (PowerShell):**
```powershell
ssh root@당신의VPS_IP주소
```

**Mac/Linux:**
```bash
ssh root@당신의VPS_IP주소
```

비밀번호 입력

### 2단계: 보안 사용자 생성

```bash
# 새 사용자 생성
adduser deploy

# sudo 권한 부여
usermod -aG sudo deploy

# 재접속
exit
ssh deploy@당신의VPS_IP주소
```

### 3단계: Node.js 설치

```bash
# NVM 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 터미널 재시작
source ~/.bashrc

# Node.js LTS 설치
nvm install --lts

# 확인
node --version
npm --version
```

### 4단계: PM2 설치

```bash
npm install -g pm2
```

### 5단계: 프로젝트 업로드

**방법 A: Git 사용 (권장)**

```bash
# 앱 디렉토리 생성
sudo mkdir -p /var/www/swift-proxy
sudo chown -R deploy:deploy /var/www/swift-proxy

# Git 설치
sudo apt update
sudo apt install git -y

# 프로젝트 클론
cd /var/www/swift-proxy
git clone https://github.com/당신의아이디/swift-proxy.git .

# 의존성 설치
npm install
```

**방법 B: SFTP 업로드**

FileZilla 또는 WinSCP 사용:
- 호스트: 당신의VPS_IP주소
- 사용자: deploy
- 비밀번호: 설정한 비밀번호
- 포트: 22

파일을 `/var/www/swift-proxy`에 업로드 후:

```bash
cd /var/www/swift-proxy
npm install
```

### 6단계: PM2로 앱 실행

```bash
# 앱 시작
pm2 start ecosystem.config.js

# 또는 직접 실행
pm2 start server.js --name swift-proxy

# 서버 재부팅 시 자동 시작
pm2 startup
# 출력된 명령어 복사해서 실행

pm2 save

# 상태 확인
pm2 status
pm2 logs swift-proxy
```

### 7단계: Nginx 설정

```bash
# Nginx 설치
sudo apt install nginx -y

# 설정 파일 생성
sudo nano /etc/nginx/sites-available/swift-proxy
```

**아래 내용 붙여넣기:**

```nginx
server {
    listen 80;
    server_name 당신의도메인.com www.당신의도메인.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        proxy_pass http://localhost:8080;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

**저장:** Ctrl+X → Y → Enter

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/swift-proxy /etc/nginx/sites-enabled/

# 기본 사이트 비활성화
sudo rm /etc/nginx/sites-enabled/default

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 8단계: 도메인 DNS 설정

**hPanel에서:**

1. **Domains** 메뉴
2. 도메인 선택 → **DNS Records**
3. **A 레코드** 추가:
   - Type: `A`
   - Name: `@`
   - Points to: `당신의VPS_IP주소`
   - TTL: `14400`

4. **www 서브도메인용 A 레코드** 추가:
   - Type: `A`
   - Name: `www`
   - Points to: `당신의VPS_IP주소`
   - TTL: `14400`

**전파 대기:** 5분 ~ 48시간 (보통 1시간 내)

### 9단계: SSL 인증서 설치 (HTTPS)

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx -y

# SSL 인증서 발급 및 자동 설정
sudo certbot --nginx -d 당신의도메인.com -d www.당신의도메인.com

# 이메일 입력
# 약관 동의: Y
# 이메일 공유: N (선택)
# HTTP → HTTPS 리다이렉트: 2 (예)

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

### ✅ VPS 배포 완료!

이제 `https://당신의도메인.com`으로 접속 가능합니다!

---

## 🌐 도메인 설정

### sitemap.xml과 robots.txt 업데이트

**1. public/sitemap.xml 수정:**

```xml
<!-- yoursite.com을 실제 도메인으로 변경 -->
<loc>https://yoursite.com/</loc>
   ↓
<loc>https://당신의도메인.com/</loc>
```

**2. public/robots.txt 수정:**

```
Sitemap: https://yoursite.com/sitemap.xml
   ↓
Sitemap: https://당신의도메인.com/sitemap.xml
```

**3. public/index.html 수정:**

```html
<!-- meta 태그의 yoursite.com을 실제 도메인으로 변경 -->
<meta property="og:url" content="https://당신의도메인.com/">
<link rel="canonical" href="https://당신의도메인.com/">
```

**4. public/games.html도 동일하게 수정**

### Google Search Console 등록

1. https://search.google.com/search-console 접속
2. **속성 추가** → 도메인 입력
3. **소유권 확인** (DNS 레코드 또는 HTML 파일)
4. **Sitemap 제출**: `https://당신의도메인.com/sitemap.xml`

---

## 🎯 SEO 최적화 완료!

### ✅ 적용된 SEO 요소

#### Meta Tags
- ✅ Title 태그 (검색 결과 제목)
- ✅ Description 태그 (검색 결과 설명)
- ✅ Keywords 태그
- ✅ Open Graph (소셜 미디어 공유)
- ✅ Twitter Cards
- ✅ Canonical URL (중복 방지)

#### Structured Data
- ✅ Schema.org JSON-LD (검색엔진이 이해하기 쉬운 구조)
- ✅ WebApplication 타입
- ✅ Game 리스트

#### 검색엔진 최적화
- ✅ robots.txt (크롤러 가이드)
- ✅ sitemap.xml (페이지 구조)
- ✅ .htaccess (보안 & 성능)

#### 성능 최적화
- ✅ Gzip 압축
- ✅ 브라우저 캐싱
- ✅ HTTPS 강제
- ✅ Preconnect 설정

---

## 🔍 검색 키워드 타겟

이 설정으로 다음 키워드에서 검색 가능:

**메인 키워드:**
- "web proxy"
- "unblock websites"
- "unblocked games"
- "free proxy"
- "school proxy"

**롱테일 키워드:**
- "how to unblock discord at school"
- "play minecraft unblocked"
- "free web proxy no download"
- "bypass school firewall"
- "unblock youtube at work"

---

## 📊 배포 후 체크리스트

### Business/Cloud 플랜
- [ ] GitHub에 코드 푸시됨
- [ ] Hostinger Node.js 앱 생성됨
- [ ] 빌드 성공 확인
- [ ] 임시 도메인 접속 확인
- [ ] 실제 도메인 연결
- [ ] HTTPS 작동 확인
- [ ] sitemap.xml 도메인 변경
- [ ] robots.txt 도메인 변경
- [ ] Google Search Console 등록
- [ ] Sitemap 제출

### VPS 플랜
- [ ] SSH 접속 가능
- [ ] Node.js 설치됨
- [ ] PM2로 앱 실행 중
- [ ] Nginx 설정 완료
- [ ] DNS A 레코드 설정
- [ ] SSL 인증서 설치
- [ ] HTTPS 리다이렉트 작동
- [ ] sitemap.xml 도메인 변경
- [ ] robots.txt 도메인 변경
- [ ] Google Search Console 등록

---

## 💡 Pro Tips

### 1. 검색 노출 빠르게 하기

```bash
# Google에 직접 URL 제출
https://www.google.com/ping?sitemap=https://당신의도메인.com/sitemap.xml
```

### 2. 성능 모니터링

```bash
# VPS에서 PM2 모니터링
pm2 monit

# 로그 확인
pm2 logs swift-proxy
```

### 3. 정기 업데이트

```bash
# VPS에서 코드 업데이트
cd /var/www/swift-proxy
git pull origin main
npm install
pm2 restart swift-proxy
```

### 4. 백업

**Business/Cloud:**
- hPanel에서 자동 백업

**VPS:**
```bash
# 백업 스크립트
tar -czf swift-proxy-backup-$(date +%Y%m%d).tar.gz /var/www/swift-proxy
```

---

## 🆘 문제 해결

### "502 Bad Gateway"
```bash
# PM2 상태 확인
pm2 status

# 재시작
pm2 restart swift-proxy
```

### "Let's Encrypt SSL 실패"
```bash
# DNS 전파 확인
nslookup 당신의도메인.com

# 방화벽 확인
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### "사이트가 검색에 안 나옴"
1. Google Search Console에서 색인 상태 확인
2. robots.txt 접근 가능한지 확인: `https://당신의도메인.com/robots.txt`
3. sitemap.xml 접근 가능한지 확인: `https://당신의도메인.com/sitemap.xml`
4. 색인 요청: Search Console → URL 검사 → 색인 생성 요청

---

## 🎉 완료!

이제 당신의 SwiftAccess가:
- ✅ Hostinger에 배포됨
- ✅ HTTPS 보안 적용됨
- ✅ Google 검색 최적화됨
- ✅ 소셜 미디어 공유 준비됨

**성공적인 런칭을 기원합니다! 🚀**

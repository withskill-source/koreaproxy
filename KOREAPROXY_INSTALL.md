# 🚀 koreaproxy.com Hostinger 설치 가이드

## 📋 도메인 정보
- **도메인**: koreaproxy.com
- **플랫폼**: Hostinger
- **언어**: 한글/영문 (이중 언어)

---

## ✅ 사전 확인

### 1. Hostinger 플랜 확인

**koreaproxy.com이 이미 Hostinger에 있나요?**

#### YES - 도메인이 있는 경우
1. hPanel 로그인: https://hpanel.hostinger.com
2. 왼쪽 메뉴에서 **Domains** 클릭
3. koreaproxy.com 확인
4. 호스팅 플랜 확인:
   - ✅ Business Hosting → **방법 A** 사용
   - ✅ Cloud Hosting → **방법 A** 사용
   - ✅ VPS Hosting → **방법 B** 사용
   - ❌ Single/Premium → **Business로 업그레이드 필요**

#### NO - 도메인이 없는 경우
1. Hostinger에서 koreaproxy.com 구매
2. 또는 다른 곳에서 구매 후 네임서버 변경:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```

---

## 🌟 방법 A: Business/Cloud 플랜 (가장 쉬움!)

### 전체 소요 시간: 약 10분

---

### 1단계: GitHub에 코드 업로드 (5분)

#### 1-1. GitHub 계정 만들기
- https://github.com 접속
- 회원가입 (무료)

#### 1-2. 새 저장소 생성
1. GitHub에 로그인
2. 오른쪽 상단 **+** 클릭 → **New repository**
3. 설정:
   - Repository name: `koreaproxy`
   - Public 선택
   - **Create repository** 클릭

#### 1-3. 코드 업로드

**방법 1: Git 사용 (추천)**

```bash
# 다운로드한 swift-proxy 폴더로 이동
cd swift-proxy

# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "KoreaProxy initial commit"

# GitHub 연결 (YOUR_USERNAME을 실제 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/koreaproxy.git

# 푸시
git push -u origin main
```

**방법 2: GitHub 웹사이트 사용 (Git 없을 때)**

1. GitHub 저장소 페이지에서 **uploading an existing file** 클릭
2. swift-proxy 폴더의 모든 파일을 드래그
3. **Commit changes** 클릭

---

### 2단계: Hostinger에서 배포 (3분)

#### 2-1. hPanel 로그인
- https://hpanel.hostinger.com

#### 2-2. Node.js 앱 생성
1. 왼쪽 메뉴에서 **Websites** 클릭
2. **Create or migrate a website** 버튼 클릭
3. **Node.js Apps** 선택

#### 2-3. GitHub 연결
1. **Deploy from GitHub** 선택
2. **Authorize GitHub** 클릭
3. GitHub 계정 연결 허용
4. 저장소 선택: `koreaproxy`
5. 브랜치 선택: `main`

#### 2-4. 빌드 설정 확인
```
Application root: /
Node.js Version: 20.x (최신)
Build Command: npm install
Start Command: npm start
Application Port: 8080
```

#### 2-5. Deploy!
- **Deploy** 버튼 클릭
- 진행 상황 확인 (2-3분 소요)
- 빌드 로그 확인

#### 2-6. 임시 도메인 확인
배포 완료되면 임시 도메인 생성:
```
https://koreaproxy-xxxx.hostingersite.com
```
브라우저에서 접속해서 확인!

---

### 3단계: koreaproxy.com 도메인 연결 (2분)

#### 3-1. 도메인 연결
1. hPanel → **Domains**
2. koreaproxy.com 찾기
3. 오른쪽에 **⋮** (메뉴) 클릭
4. **Connect to Website** 선택
5. 방금 만든 Node.js 앱 선택
6. **Connect Domain** 클릭

#### 3-2. DNS 전파 대기
- 5분 ~ 1시간 소요 (보통 10-20분)
- 확인: https://koreaproxy.com 접속

#### 3-3. HTTPS 자동 적용
- Hostinger가 자동으로 SSL 인증서 설치
- 10-20분 후 https://koreaproxy.com 접속 가능

---

### 4단계: 완료 확인 ✅

**접속 테스트:**
```
✅ https://koreaproxy.com - 메인 페이지
✅ https://koreaproxy.com/games - 게임 페이지
✅ https://koreaproxy.com/sitemap.xml - 사이트맵
✅ https://koreaproxy.com/robots.txt - 로봇 파일
```

**모두 접속되면 성공! 🎉**

---

## 🛠️ 방법 B: VPS 플랜

### 전체 소요 시간: 약 30분

---

### 1단계: VPS 접속 정보 확인

1. hPanel → **VPS**
2. IP 주소 확인: `123.456.78.90` (예시)
3. SSH 접속 정보:
   - Username: `root`
   - Password: (hPanel에서 확인)

---

### 2단계: SSH 접속

**Windows:**
```powershell
# PowerShell 열기
ssh root@123.456.78.90
# 비밀번호 입력
```

**Mac/Linux:**
```bash
ssh root@123.456.78.90
# 비밀번호 입력
```

---

### 3단계: 보안 사용자 생성

```bash
# 새 사용자 생성
adduser deploy

# 비밀번호 설정 (입력 후 Enter)
# 나머지는 Enter로 스킵

# sudo 권한 부여
usermod -aG sudo deploy

# 재접속
exit
ssh deploy@123.456.78.90
```

---

### 4단계: Node.js 설치

```bash
# NVM 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 설정 적용
source ~/.bashrc

# Node.js LTS 설치
nvm install --lts

# 확인
node --version
npm --version
```

**출력 예시:**
```
v20.11.0
10.2.4
```

---

### 5단계: PM2 설치

```bash
npm install -g pm2
```

---

### 6단계: 프로젝트 업로드

**방법 A: Git 사용 (추천)**

```bash
# Git 설치
sudo apt update
sudo apt install git -y

# 프로젝트 디렉토리 생성
sudo mkdir -p /var/www/koreaproxy
sudo chown -R deploy:deploy /var/www/koreaproxy

# 프로젝트 클론
cd /var/www/koreaproxy
git clone https://github.com/YOUR_USERNAME/koreaproxy.git .

# 의존성 설치
npm install
```

**방법 B: SFTP 업로드**

1. FileZilla 또는 WinSCP 다운로드
2. 접속 정보:
   - Host: `123.456.78.90`
   - Username: `deploy`
   - Password: (설정한 비밀번호)
   - Port: `22`
3. swift-proxy 폴더의 모든 파일을 `/var/www/koreaproxy`에 업로드
4. SSH에서:
```bash
cd /var/www/koreaproxy
npm install
```

---

### 7단계: PM2로 앱 실행

```bash
# 앱 시작
pm2 start server.js --name koreaproxy

# 서버 재부팅 시 자동 시작 설정
pm2 startup
# 출력된 명령어를 복사해서 실행

pm2 save

# 상태 확인
pm2 status
```

**출력 예시:**
```
┌─────┬──────────────┬─────────┬─────────┬──────────┐
│ id  │ name         │ status  │ restart │ uptime   │
├─────┼──────────────┼─────────┼─────────┼──────────┤
│ 0   │ koreaproxy   │ online  │ 0       │ 0s       │
└─────┴──────────────┴─────────┴─────────┴──────────┘
```

---

### 8단계: Nginx 설치 및 설정

```bash
# Nginx 설치
sudo apt install nginx -y

# 설정 파일 생성
sudo nano /etc/nginx/sites-available/koreaproxy
```

**아래 내용 붙여넣기:**

```nginx
server {
    listen 80;
    server_name koreaproxy.com www.koreaproxy.com;

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

    # Static files caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf)$ {
        proxy_pass http://localhost:8080;
        expires 7d;
        add_header Cache-Control "public, immutable";
    }
}
```

**저장:** `Ctrl + X` → `Y` → `Enter`

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/koreaproxy /etc/nginx/sites-enabled/

# 기본 사이트 비활성화
sudo rm /etc/nginx/sites-enabled/default

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
sudo systemctl enable nginx
```

---

### 9단계: DNS 설정

#### 9-1. hPanel에서 DNS 설정

1. hPanel → **Domains**
2. koreaproxy.com 클릭
3. **DNS / Nameservers** 메뉴
4. **DNS Records** 클릭
5. **A 레코드** 추가/수정:

```
Type: A
Name: @
Points to: 123.456.78.90 (VPS IP 주소)
TTL: 14400
```

6. **www 서브도메인** A 레코드:

```
Type: A
Name: www
Points to: 123.456.78.90 (VPS IP 주소)
TTL: 14400
```

#### 9-2. 전파 확인

```bash
# DNS 전파 확인
nslookup koreaproxy.com

# 또는
ping koreaproxy.com
```

**5분~1시간 대기**

---

### 10단계: SSL 인증서 설치 (HTTPS)

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx -y

# SSL 인증서 자동 발급 및 설정
sudo certbot --nginx -d koreaproxy.com -d www.koreaproxy.com
```

**질문 답변:**
```
이메일: 본인 이메일 입력
약관 동의: Y
이메일 공유: N
HTTP → HTTPS 리다이렉트: 2 (선택)
```

```bash
# 자동 갱신 테스트
sudo certbot renew --dry-run
```

---

### 11단계: 방화벽 설정

```bash
# 방화벽 활성화
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

### ✅ VPS 배포 완료!

**접속 테스트:**
```
✅ https://koreaproxy.com
✅ https://www.koreaproxy.com
✅ https://koreaproxy.com/games
```

---

## 🔍 Google Search Console 등록

### 1. Google Search Console 접속
https://search.google.com/search-console

### 2. 속성 추가
1. **속성 추가** 클릭
2. **도메인** 선택
3. `koreaproxy.com` 입력

### 3. 소유권 확인
**방법 1: DNS TXT 레코드 (추천)**
1. Google이 제공하는 TXT 레코드 복사
2. hPanel → Domains → koreaproxy.com → DNS Records
3. TXT 레코드 추가:
   ```
   Type: TXT
   Name: @
   Value: google-site-verification=xxxxx (Google 제공)
   ```
4. Google에서 **확인** 클릭

### 4. Sitemap 제출
1. 왼쪽 메뉴 **Sitemaps**
2. `https://koreaproxy.com/sitemap.xml` 입력
3. **제출** 클릭

---

## 🇰🇷 네이버 서치어드바이저 등록

### 1. 네이버 서치어드바이저 접속
https://searchadvisor.naver.com

### 2. 사이트 등록
1. **웹마스터 도구** → **사이트 등록**
2. `https://koreaproxy.com` 입력

### 3. 소유권 확인
HTML 파일 다운로드 → public 폴더에 업로드

### 4. 사이트맵 제출
- 사이트맵 URL: `https://koreaproxy.com/sitemap.xml`

---

## 📊 배포 후 체크리스트

### 즉시 확인
- [ ] https://koreaproxy.com 접속됨
- [ ] https://koreaproxy.com/games 접속됨
- [ ] HTTPS 자물쇠 표시됨
- [ ] 모바일에서도 접속됨

### 1주일 내
- [ ] Google Search Console 등록 완료
- [ ] 네이버 서치어드바이저 등록 완료
- [ ] Sitemap 제출 완료
- [ ] Google에서 "koreaproxy" 검색 시 나타남

### 1개월 내
- [ ] "웹 프록시" 검색 시 노출
- [ ] "사이트 차단 해제" 검색 시 노출
- [ ] 방문자 통계 확인

---

## 🆘 문제 해결

### "사이트에 접속할 수 없습니다"

**Business/Cloud:**
```
1. hPanel → Websites → Node.js 앱 확인
2. 상태가 "Running"인지 확인
3. Logs 확인
```

**VPS:**
```bash
# PM2 상태 확인
pm2 status

# 로그 확인
pm2 logs koreaproxy

# 재시작
pm2 restart koreaproxy
```

### "502 Bad Gateway"

```bash
# VPS에서
pm2 restart koreaproxy
sudo systemctl restart nginx
```

### DNS 전파 확인

```bash
# 온라인 도구
https://dnschecker.org

# 도메인 입력: koreaproxy.com
```

---

## 📞 추가 도움

- **Hostinger 고객지원**: 24/7 라이브챗
- **문서**: 이 폴더의 다른 .md 파일 참조
- **GitHub Issues**: 문제 보고

---

**koreaproxy.com 성공적인 런칭을 기원합니다! 🇰🇷🚀**

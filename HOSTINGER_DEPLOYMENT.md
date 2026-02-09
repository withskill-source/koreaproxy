# 🚀 Hostinger에 SwiftAccess 배포하기 (완벽 가이드)

## 📋 목차
1. [호스팅 플랜 확인](#호스팅-플랜-확인)
2. [방법 1: Business/Cloud 플랜 (가장 쉬움)](#방법-1-businesscloud-플랜)
3. [방법 2: VPS 플랜](#방법-2-vps-플랜)
4. [배포 후 설정](#배포-후-설정)

---

## 🎯 호스팅 플랜 확인

먼저 현재 가지고 계신 Hostinger 플랜을 확인하세요:

### ✅ Node.js 지원 플랜
- **Business Hosting** → 방법 1 사용 (권장)
- **Cloud Hosting** (Startup/Professional/Enterprise) → 방법 1 사용 (권장)
- **VPS Hosting** → 방법 2 사용

### ❌ Node.js 미지원 플랜
- **Premium Hosting**
- **Single Hosting**

> 💡 **Shared Hosting 플랜을 사용 중이라면** Business 플랜으로 업그레이드하거나, VPS를 추가 구매해야 합니다.

---

## 🌟 방법 1: Business/Cloud 플랜 (추천!)

이 방법이 **가장 쉽고 빠릅니다**. GitHub 연동 또는 ZIP 파일 업로드만으로 배포됩니다.

### 단계별 가이드

#### 1️⃣ GitHub에 프로젝트 업로드 (선택사항)

GitHub를 사용하는 경우:

```bash
# 프로젝트 폴더에서 실행
cd swift-proxy

# Git 초기화
git init

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit - SwiftAccess Proxy"

# GitHub 저장소 생성 후 연결
git remote add origin https://github.com/당신의아이디/swift-proxy.git

# 푸시
git push -u origin main
```

#### 2️⃣ Hostinger hPanel에 로그인

1. https://hpanel.hostinger.com 접속
2. 로그인

#### 3️⃣ Node.js 웹앱 생성

1. **좌측 메뉴에서 "Websites" 클릭**
2. **"Create or migrate a website" 클릭**
3. **"Node.js Apps" 선택**

#### 4️⃣ 배포 방법 선택

**옵션 A: GitHub 연동 (권장)**

```
1. "Deploy from GitHub" 선택
2. "Authorize GitHub" 클릭
3. GitHub 계정 연결 허용
4. 저장소 선택 (swift-proxy)
5. 브랜치 선택 (main 또는 master)
```

**옵션 B: ZIP 파일 업로드**

```
1. "Upload files" 선택
2. 프로젝트 폴더를 ZIP으로 압축
3. ZIP 파일 업로드
```

#### 5️⃣ 빌드 설정

Hostinger가 자동으로 감지하지만, 확인/수정하세요:

```yaml
Build settings:
  Node.js Version: 18 또는 20 (최신)
  Build Command: npm install
  Start Command: npm start
  Root Directory: / (루트)
  Environment Variables: (필요시 추가)
```

#### 6️⃣ 배포 시작

1. **"Deploy" 버튼 클릭**
2. 빌드 진행 상황 확인 (1-3분 소요)
3. 완료되면 임시 도메인 제공:
   ```
   https://swift-proxy-xxxx.hostingersite.com
   ```

#### 7️⃣ 커스텀 도메인 연결 (선택사항)

임시 도메인 대신 본인 도메인 사용:

```
1. hPanel에서 "Domains" 메뉴
2. "Connect Domain" 클릭
3. 도메인 선택 또는 입력
4. DNS 자동 설정됨
5. 5-10분 후 도메인으로 접속 가능
```

### 🎉 완료!

이제 웹사이트가 라이브로 운영됩니다!
- 자동 HTTPS (SSL 인증서)
- 무제한 트래픽
- 자동 백업
- GitHub push 시 자동 재배포

---

## 🛠️ 방법 2: VPS 플랜

VPS를 사용하는 경우 더 많은 제어권이 있지만, 설정이 복잡합니다.

### 사전 준비

- VPS 플랜 구독
- SSH 접속 정보 (IP, 사용자명, 비밀번호)
- 기본 Linux 명령어 지식

### 단계별 가이드

#### 1️⃣ VPS 설정

1. **hPanel에서 VPS 정보 확인**
   - VPS 메뉴 클릭
   - IP 주소 확인
   - SSH 접속 정보 확인

2. **선택사항: CloudPanel 템플릿 사용**
   - VPS 생성 시 "Ubuntu with CloudPanel" 템플릿 선택
   - 자동으로 웹 관리 패널 설치됨

#### 2️⃣ SSH 접속

**Windows:**
```powershell
# PowerShell 사용
ssh root@YOUR_VPS_IP

# 또는 PuTTY 사용
# 1. PuTTY 다운로드
# 2. IP 입력
# 3. 접속
```

**Mac/Linux:**
```bash
ssh root@YOUR_VPS_IP
```

비밀번호 입력

#### 3️⃣ 보안 사용자 생성

```bash
# 새 사용자 생성
adduser deploy

# sudo 권한 부여
usermod -aG sudo deploy

# 새 사용자로 재접속
exit
ssh deploy@YOUR_VPS_IP
```

#### 4️⃣ Node.js 설치

```bash
# NVM 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 터미널 재시작
source ~/.bashrc

# Node.js 설치 (LTS 버전)
nvm install --lts

# 확인
node --version
npm --version
```

#### 5️⃣ PM2 설치 (프로세스 관리자)

```bash
npm install -g pm2
```

#### 6️⃣ 프로젝트 업로드

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

```bash
# FileZilla 또는 WinSCP 사용
# 호스트: YOUR_VPS_IP
# 사용자: deploy
# 비밀번호: 설정한 비밀번호
# 포트: 22

# 파일을 /var/www/swift-proxy에 업로드

# SSH에서 의존성 설치
cd /var/www/swift-proxy
npm install
```

#### 7️⃣ PM2로 앱 실행

```bash
# 앱 시작
pm2 start server.js --name swift-proxy

# 서버 재부팅 시 자동 시작 설정
pm2 startup
# 출력된 명령어 복사해서 실행

pm2 save

# 상태 확인
pm2 status
pm2 logs swift-proxy
```

#### 8️⃣ Nginx 설치 및 설정 (리버스 프록시)

```bash
# Nginx 설치
sudo apt install nginx -y

# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/swift-proxy
```

다음 내용 입력:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN.com www.YOUR_DOMAIN.com;

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
}
```

Ctrl+X, Y, Enter로 저장

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/swift-proxy /etc/nginx/sites-enabled/

# 기본 사이트 비활성화 (선택사항)
sudo rm /etc/nginx/sites-enabled/default

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx

# Nginx 자동 시작 설정
sudo systemctl enable nginx
```

#### 9️⃣ 도메인 연결

**hPanel에서:**
1. Domains 메뉴
2. DNS 레코드 관리
3. A 레코드 추가:
   - Type: A
   - Name: @ (또는 www)
   - Points to: YOUR_VPS_IP
   - TTL: 14400

**전파 대기:** 5분~48시간 (보통 1시간 내)

#### 🔟 SSL 인증서 설치 (HTTPS)

```bash
# Certbot 설치
sudo apt install certbot python3-certbot-nginx -y

# SSL 인증서 발급 및 자동 설정
sudo certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com

# 이메일 입력
# 약관 동의: Y
# 이메일 공유: N (선택)
# HTTP → HTTPS 리다이렉트: 2 (선택)

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

### 🎉 VPS 배포 완료!

이제 https://YOUR_DOMAIN.com 으로 접속 가능합니다!

---

## ⚙️ 배포 후 설정

### 환경 변수 설정

**Business/Cloud 플랜:**
```
hPanel → Node.js App → Environment Variables
```

**VPS:**
```bash
# .env 파일 생성
nano /var/www/swift-proxy/.env

# 내용 입력
PORT=8080
NODE_ENV=production

# 저장 후 PM2 재시작
pm2 restart swift-proxy
```

### 광고 코드 삽입

배포 후 광고를 추가하려면:

1. **파일 수정**
   - Business/Cloud: GitHub에서 수정 후 push (자동 재배포)
   - VPS: 직접 파일 수정

2. **광고 코드 위치**
   ```html
   public/index.html
   public/games.html
   
   <!-- .ad-placeholder 부분을 광고 코드로 교체 -->
   ```

3. **재배포**
   - Business/Cloud: Git push 시 자동
   - VPS: `pm2 restart swift-proxy`

---

## 🔧 유용한 명령어 (VPS)

### PM2 관리

```bash
# 앱 상태 확인
pm2 status

# 로그 보기
pm2 logs swift-proxy

# 앱 재시작
pm2 restart swift-proxy

# 앱 중지
pm2 stop swift-proxy

# 앱 삭제
pm2 delete swift-proxy

# 메모리/CPU 모니터링
pm2 monit
```

### 코드 업데이트

**Git 사용:**
```bash
cd /var/www/swift-proxy
git pull origin main
npm install
pm2 restart swift-proxy
```

**수동 업로드:**
```bash
# SFTP로 파일 교체 후
cd /var/www/swift-proxy
npm install
pm2 restart swift-proxy
```

### Nginx 관리

```bash
# 설정 테스트
sudo nginx -t

# 재시작
sudo systemctl restart nginx

# 상태 확인
sudo systemctl status nginx

# 로그 확인
sudo tail -f /var/log/nginx/error.log
```

---

## 🚨 문제 해결

### "502 Bad Gateway" 에러

```bash
# PM2 상태 확인
pm2 status

# 앱이 중지되어 있다면
pm2 restart swift-proxy

# 포트 충돌 확인
sudo lsof -i :8080
```

### 사이트가 로드되지 않음

```bash
# 방화벽 확인
sudo ufw status

# 80, 443 포트 허용
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Nginx 상태
sudo systemctl status nginx
```

### SSL 인증서 에러

```bash
# 인증서 갱신
sudo certbot renew

# Nginx 재시작
sudo systemctl restart nginx
```

---

## 📊 성능 모니터링

### Business/Cloud 플랜
- hPanel에서 자동으로 모니터링 제공
- CPU, 메모리, 트래픽 확인 가능

### VPS

**PM2 모니터링:**
```bash
pm2 monit
```

**시스템 리소스:**
```bash
# CPU/메모리
htop

# 디스크 사용량
df -h

# 네트워크
sudo iftop
```

---

## 💡 Pro Tips

1. **정기 백업**
   - Business/Cloud: 자동 백업
   - VPS: 매일 백업 스크립트 설정

2. **로그 로테이션**
   ```bash
   # PM2 로그 정리
   pm2 flush
   ```

3. **보안 강화**
   ```bash
   # 방화벽 활성화
   sudo ufw enable
   
   # SSH 포트 변경 (선택)
   sudo nano /etc/ssh/sshd_config
   # Port 22 → Port 2222
   ```

4. **성능 최적화**
   - CDN 사용 (Cloudflare)
   - 이미지 최적화
   - Gzip 압축

---

## 🎯 빠른 체크리스트

### Business/Cloud 플랜
- [ ] GitHub에 코드 푸시
- [ ] hPanel에서 Node.js App 생성
- [ ] GitHub 저장소 연결
- [ ] 배포 완료 대기
- [ ] 임시 도메인 확인
- [ ] 커스텀 도메인 연결 (선택)
- [ ] 광고 코드 삽입
- [ ] 최종 테스트

### VPS 플랜
- [ ] SSH 접속
- [ ] Node.js 설치
- [ ] PM2 설치
- [ ] 프로젝트 업로드
- [ ] PM2로 앱 실행
- [ ] Nginx 설정
- [ ] 도메인 연결
- [ ] SSL 인증서 설치
- [ ] 광고 코드 삽입
- [ ] 최종 테스트

---

## 📞 추가 도움이 필요하시면

- **Hostinger 고객 지원**: https://support.hostinger.com
- **라이브 챗**: hPanel 우측 하단
- **이메일**: support@hostinger.com

---

**성공적인 배포를 기원합니다! 🚀**

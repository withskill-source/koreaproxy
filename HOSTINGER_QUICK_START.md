# ⚡ Hostinger 빠른 시작 (3분 완성)

## 🎯 당신의 플랜 확인

### Business/Cloud 플랜 (가장 쉬움! 👍)

1. **hPanel 로그인**: https://hpanel.hostinger.com
2. **Websites → Create website → Node.js Apps**
3. **GitHub 연동** 또는 **ZIP 업로드**
4. **Deploy 클릭** 
5. **완료!** 🎉

→ 상세 가이드: `HOSTINGER_DEPLOYMENT.md` 참조

---

### VPS 플랜

#### 1️⃣ SSH 접속
```bash
ssh root@YOUR_VPS_IP
```

#### 2️⃣ 빠른 설치 스크립트
```bash
# Node.js 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# PM2 설치
npm install -g pm2

# 프로젝트 설정
mkdir -p /var/www/swift-proxy
cd /var/www/swift-proxy

# Git에서 다운로드 (본인 저장소로 변경)
git clone https://github.com/yourusername/swift-proxy.git .

# 또는 SFTP로 파일 업로드

# 의존성 설치
npm install

# 앱 시작
pm2 start server.js --name swift-proxy
pm2 startup
pm2 save
```

#### 3️⃣ Nginx 설정
```bash
# Nginx 설치
sudo apt install nginx -y

# 설정 파일 복사
sudo cp nginx.conf.template /etc/nginx/sites-available/swift-proxy

# YOUR_DOMAIN.com을 실제 도메인으로 변경
sudo nano /etc/nginx/sites-available/swift-proxy

# 활성화
sudo ln -s /etc/nginx/sites-available/swift-proxy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 4️⃣ SSL 설치
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d YOUR_DOMAIN.com
```

#### ✅ 완료!
https://YOUR_DOMAIN.com 접속

---

## 🆘 문제 발생 시

### "사이트가 안 열려요"
```bash
# PM2 상태 확인
pm2 status

# 재시작
pm2 restart swift-proxy

# 로그 확인
pm2 logs swift-proxy
```

### "502 에러"
```bash
# Nginx 재시작
sudo systemctl restart nginx

# 방화벽 확인
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## 📚 더 자세한 내용

- **완전한 가이드**: `HOSTINGER_DEPLOYMENT.md`
- **프로젝트 정보**: `README.md`
- **수익화**: `MONETIZATION_GUIDE.md`

---

**도움이 필요하시면 Hostinger 고객지원 24/7 이용 가능!**

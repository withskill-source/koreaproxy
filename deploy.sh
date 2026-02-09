#!/bin/bash

# SwiftAccess 배포 자동화 스크립트 (VPS용)
# 사용법: ./deploy.sh

echo "=========================================="
echo "🚀 SwiftAccess 배포 스크립트"
echo "=========================================="
echo ""

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 프로젝트 디렉토리
PROJECT_DIR="/var/www/swift-proxy"
APP_NAME="swift-proxy"

# 에러 처리
set -e

echo -e "${YELLOW}📦 1. Git에서 최신 코드 가져오기...${NC}"
cd $PROJECT_DIR
git pull origin main || git pull origin master
echo -e "${GREEN}✓ 코드 업데이트 완료${NC}"
echo ""

echo -e "${YELLOW}📦 2. 의존성 설치...${NC}"
npm install --production
echo -e "${GREEN}✓ 의존성 설치 완료${NC}"
echo ""

echo -e "${YELLOW}🔧 3. PM2 앱 재시작...${NC}"
pm2 restart $APP_NAME || pm2 start ecosystem.config.js
echo -e "${GREEN}✓ 앱 재시작 완료${NC}"
echo ""

echo -e "${YELLOW}💾 4. PM2 상태 저장...${NC}"
pm2 save
echo -e "${GREEN}✓ PM2 상태 저장 완료${NC}"
echo ""

echo -e "${YELLOW}🔄 5. Nginx 설정 리로드...${NC}"
sudo systemctl reload nginx
echo -e "${GREEN}✓ Nginx 리로드 완료${NC}"
echo ""

echo -e "${YELLOW}📊 6. 상태 확인...${NC}"
pm2 status
echo ""

echo -e "${GREEN}=========================================="
echo "✅ 배포 완료!"
echo "==========================================${NC}"
echo ""
echo "📍 로그 확인: pm2 logs $APP_NAME"
echo "📍 모니터링: pm2 monit"
echo "📍 재시작: pm2 restart $APP_NAME"
echo ""

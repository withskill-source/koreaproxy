// PM2 생태계 설정 파일
// VPS에서 사용: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'swift-proxy',
    script: './server.js',
    
    // 인스턴스 설정
    instances: 1, // CPU 코어 수에 따라 조정 (또는 'max')
    exec_mode: 'cluster', // 클러스터 모드로 실행
    
    // 환경 변수
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    
    // 로그 설정
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // 자동 재시작 설정
    watch: false, // 파일 변경 감지 (개발용)
    ignore_watch: ['node_modules', 'logs'],
    max_memory_restart: '500M', // 메모리 제한
    
    // 재시작 정책
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    
    // 크론 재시작 (매일 새벽 4시)
    cron_restart: '0 4 * * *'
  }]
};

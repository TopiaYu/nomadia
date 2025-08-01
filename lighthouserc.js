module.exports = {
  ci: {
    collect: {
      // 실제 배포 URL 사용 (포트 충돌 방지)
      url: ['https://nomadia-two.vercel.app/'],

      // 또는 다른 포트 사용
      // startServerCommand: 'pnpm start --port 3001',
      // startServerReadyPattern: 'ready on',
      // url: ['http://localhost:3001'],
      numberOfRuns: 3,
    },
    assert: {
      // 성능 기준 설정
      assertions: {
        'categories:performance': ['warn', { minScore: 0.5 }],
        'categories:accessibility': ['error', { minScore: 0.5 }],
        'categories:best-practices': ['warn', { minScore: 0.5 }],
        'categories:seo': ['warn', { minScore: 0.5 }],
        // 특정 메트릭 기준 설정
        'first-contentful-paint': ['warn', { maxNumericValue: 3000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 5000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],
      },
    },
    upload: {
      // 업로드 비활성화 (토큰 없이 로컬에서만 실행)
      target: 'filesystem',
    },
  },
};

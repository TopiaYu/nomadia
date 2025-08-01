module.exports = {
  ci: {
    collect: {
      // 실제 배포 URL 사용 (포트 충돌 방지)
      url: ['https://nomadia-two.vercel.app/'],
      numberOfRuns: 3,
      // 한글 설정 및 HTML 보고서 생성
      settings: {
        locale: 'ko',
        output: 'html',
        outputPath: './lighthouse-reports',
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      // 성능 기준 설정 (한글 메시지)
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
      // HTML 보고서를 GitHub Actions에서 업로드
      target: 'filesystem',
      outputDir: './lighthouse-reports',
    },
  },
};

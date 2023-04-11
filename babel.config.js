module.exports = {
  plugins: [
    '@emotion',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
  ],
  presets: [
    [
      '@babel/preset-react',
      {
        // jsx 자동 변환
        runtime: 'automatic',
        // emotion 처리
        importSource: '@emotion/react',
      },
    ],
    // 현재 nodejs버전에서 실행
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
};

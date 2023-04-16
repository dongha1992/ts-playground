// https://github.com/kentcdodds/bookshelf/blob/main/src/dev-tools/load.js 참고

function loadDevTools(callback: () => void) {
  const url = new URL(window.location.href);
  const setInUrl = url.searchParams.has('dev-tools');
  const urlEnabled = url.searchParams.get('dev-tools') === 'true';
  if (setInUrl) {
    if (urlEnabled) {
      return go();
    } else {
      return callback();
    }
  }

  // 로컬스토리지에 저장된 게 있는 지 검사
  const localStorageValue = window.localStorage.getItem('dev-tools');
  const setInLocalStorage = localStorageValue !== null;
  const localStorageEnabled = localStorageValue === 'true';
  if (setInLocalStorage) {
    if (localStorageEnabled) {
      return go();
    } else {
      return callback();
    }
  }

  // 테스트환경에서는 끔
  if (window.Cypress) {
    return callback();
  }

  // 개발환경에서는 실행

  if (process.env.NODE_ENV === 'development') {
    return go();
  }

  function go() {
    console.log('go');
    // 다이나믹 임포트로 번들 사이즈 관리

    import('./dev-tools').then(devTools => devTools.install()).finally(callback);
  }
}
export { loadDevTools };

/*
eslint
  no-unused-expressions: "off",
*/

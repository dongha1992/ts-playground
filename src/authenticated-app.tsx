import { Routes } from 'routes';

function AuthenticatedApp() {
  return (
    <div>
      {/* 공통 처리해야 할 컴포넌트가 옴 */}
      <Routes />
    </div>
  );
}

export default AuthenticatedApp;

import { useAuth } from 'auth/auth-context';
import { Routes } from 'routes';

function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <div>
      {/* 공통 처리해야 할 컴포넌트가 옴 */}
      <button onClick={logout}>로그아웃</button>
      <Routes />
    </div>
  );
}

export default AuthenticatedApp;

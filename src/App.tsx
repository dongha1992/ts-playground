/* AuthenticatedApp과 UnauthenticatedApp 분기 */
import { useAuth } from 'auth/auth-context';
import AuthenticatedApp from 'authenticated-app';
import UnauthenticatedApp from 'unauthenticated-app';

// TODO: lazy사용

function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;

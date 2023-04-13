/* AuthenticatedApp과 UnauthenticatedApp 분기 */
import AuthenticatedApp from 'authenticated-app';
import UnauthenticatedApp from 'unauthenticated-app';
// TODO: lazy사용
// TODO: auth 추가

function App() {
  const user = null;
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;

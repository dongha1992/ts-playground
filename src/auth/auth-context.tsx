import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
// import { queryCache } from 'react-query';
import * as auth from './auth-provider';
import { useAsync } from 'hooks/useAsync';
import { getMeApi } from 'api/case2/user';

async function getUser() {
  let user = null;
  // const token = await auth.getToken();
  const token = '1213';

  if (token) {
    const data = await getMeApi({ token });
    user = data.user;
  }
  return user;
}

const AuthContext = createContext<null | any>(null);
AuthContext.displayName = 'AuthContext';

function AuthProvider(props: PropsWithChildren) {
  const value = null;

  useEffect(() => {
    getUser();
  }, []);

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

function useClient() {}

export { AuthProvider, useAuth, useClient };

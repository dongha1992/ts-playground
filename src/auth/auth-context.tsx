import { PropsWithChildren, createContext, useContext, useEffect } from 'react';
// import { queryCache } from 'react-query';
import * as auth from './auth-provider';
// import { useAsync } from 'hooks/useAsync';
import { getMeApi } from 'api/case2/user';
import { useAsync } from 'hooks/useAsync';

async function getUser() {
  let user = null;
  const token = await auth.getToken();

  if (token) {
    const data = await getMeApi({ token });
    user = data.user;
  }
  return user;
}

const AuthContext = createContext<null | any>(null);
AuthContext.displayName = 'AuthContext';

function AuthProvider(props: PropsWithChildren) {
  const { data: user, error, isLoading, isIdle, isError, isSuccess, run, setData, status } = useAsync();

  useEffect(() => {
    getUser();
  }, []);

  const register = (form: any) => {
    console.log(form, 'form');
    return auth.register(form).then(user => setData(user));
  };

  // TODO: 메모 해야함

  const value: any = {
    user,
    register,
  };

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

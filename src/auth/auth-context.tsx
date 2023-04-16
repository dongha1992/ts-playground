import { PropsWithChildren, createContext, useContext, useEffect, useMemo, useCallback, useState } from 'react';
// import { queryCache } from 'react-query';
import * as auth from './auth-provider';
import { getMeApi } from 'api/case2/user';
import { useAsync } from 'hooks/useAsync';
import { FullPageErrorFallback, FullPageSpinner } from 'components';

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
    run(getUser());
  }, [run]);

  const register = useCallback(
    (form: any) => {
      return auth.register(form).then(user => setData(user));
    },
    [setData]
  );

  // TODO: 메모 해야함

  const value = { user, register };

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />;
  }

  throw new Error(`알 수 없는 에러 발생: ${status}`);
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

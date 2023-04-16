import normalize from 'emotion-normalize';
import { css, Global } from '@emotion/react';
import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import 'styles/sass/app.scss';
import { GlobalPortal } from 'GlobalPortal';
import { PageLayout } from 'components';
import { AuthProvider } from 'auth/auth-context';
import { useForceRerender } from 'hooks/useForceRerender';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry(failureCount: number, error: any) {
        if (error.status === 404) {
          return false;
        } else if (failureCount < 2) {
          return true;
        } else {
          return false;
        }
      },
    },
  },
});

interface Props {
  children: ReactNode;
}

function AppProviders({ children }: Props) {
  const forceRenderer = useForceRerender();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalPortal.Provider>
        <Global
          styles={css`
            ${normalize}
            h1, h2, h3, h4, h5, h6 {
              font-size: 1em;
              font-weight: normal;
              margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
            }
          `}
        />
        <PageLayout>
          <Router>
            <button onClick={forceRenderer}>강제 렌더</button>
            <AuthProvider>{children}</AuthProvider>
          </Router>
        </PageLayout>
      </GlobalPortal.Provider>
    </QueryClientProvider>
  );
}

export { AppProviders };

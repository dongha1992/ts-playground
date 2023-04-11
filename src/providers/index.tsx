import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

/* 이 파일에서 react-query, auth-provider 넣어줌 */

interface Props {
  children: ReactNode;
}

function AppProviders({ children }: Props) {
  return <Router>{children}</Router>;
}

export { AppProviders };

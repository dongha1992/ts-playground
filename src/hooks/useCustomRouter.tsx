import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { stringify } from 'qs';
import { RoutePath } from './types';

function useCustomRouter() {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      back(steps = 1) {
        navigate(-steps);
      },
      push(path: RoutePath, search?: any) {
        navigate({ pathname: path, search: search ? stringify(search, { indices: false }) : undefined });
      },
    };
  }, [navigate]);
}

export { useCustomRouter };

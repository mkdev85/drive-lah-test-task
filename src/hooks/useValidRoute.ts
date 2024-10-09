import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routeConfig } from '../routes/routeConfig';

export function useValidRoute(): boolean {
  const location = useLocation();

  const validPaths = useMemo(() => routeConfig.map(route => route.path), []);

  const isValidRoute = useMemo(
    () => validPaths.some(path => location.pathname === path),
    [location.pathname, validPaths]
  );

  return isValidRoute;
}

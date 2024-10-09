import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routeConfig } from '../routes';

export function useValidRoute(): boolean {
  const location = useLocation();

  const validPaths = useMemo(() => routeConfig.map(route => route.path), [routeConfig]);

  const isValidRoute = useMemo(
    () => validPaths.some(path => location.pathname === path),
    [location.pathname, validPaths]
  );

  return isValidRoute;
}

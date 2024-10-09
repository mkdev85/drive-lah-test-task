import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from '../components/Loader';

import { ComponentRouteConfig } from './types';

const Subscription = lazy(() => import('../pages/Subscription'));
const Location = lazy(() => import('../pages/Location'));
const About = lazy(() => import('../pages/About'));
const Features = lazy(() => import('../pages/Features'));
const Rules = lazy(() => import('../pages/Rules'));
const Pricing = lazy(() => import('../pages/Pricing'));
const Promotion = lazy(() => import('../pages/Promotion'));
const Pictures = lazy(() => import('../pages/Pictures'));
const Insurance = lazy(() => import('../pages/Insurance'));
const Device = lazy(() => import('../pages/Device'));
const EarlyAccess = lazy(() => import('../pages/EarlyAccess'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes: React.FC = () => {
  const routeConfig: ComponentRouteConfig[] = [
    { path: '/location', component: <Location />, name: 'Location' },
    { path: '/about', component: <About />, name: 'About' },
    { path: '/features', component: <Features />, name: 'Features' },
    { path: '/rules', component: <Rules />, name: 'Rules' },
    { path: '/pricing', component: <Pricing />, name: 'Pricing' },
    { path: '/promotion', component: <Promotion />, name: 'Promotion' },
    { path: '/pictures', component: <Pictures />, name: 'Pictures' },
    { path: '/insurance', component: <Insurance />, name: 'Insurance' },
    { path: '/subscription', component: <Subscription />, name: 'Subscription' },
    { path: '/device', component: <Device />, name: 'Device' },
    { path: '/early-access', component: <EarlyAccess />, name: 'Early Access' },
    { path: '*', component: <NotFound />, name: 'Not Found' },
  ]
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/subscription" />} />
        {routeConfig.map(route => (
          <Route key={route.name} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteConfig } from './types';
import Subscription from '../pages/Subscription';
import Location from '../pages/Location';
import About from '../pages/About';
import Features from '../pages/Features';
import Rules from '../pages/Rules';
import Pricing from '../pages/Pricing';
import Promotion from '../pages/Promotion';
import Pictures from '../pages/Pictures';
import Insurance from '../pages/Insurance';
import Device from '../pages/Device';
import EarlyAccess from '../pages/EarlyAccess';
import NotFound from '../pages/NotFound';

export const routeConfig: RouteConfig[] = [
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
];

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/subscription" />} />
      {routeConfig.map(route => (
        <Route key={route.name} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default AppRoutes;

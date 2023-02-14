import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import DashboardRoute from './DashboardRoute';

const Dashboard = React.lazy(() => import('../screens/Dashboard'));

const DashboardNavigator: NavigatorRouteType[] = [
  { path: DashboardRoute.LANDING.path, name: DashboardRoute.LANDING.name, component: Dashboard },
];

export default DashboardNavigator;

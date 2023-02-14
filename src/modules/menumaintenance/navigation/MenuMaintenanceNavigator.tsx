import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import MenuMaintenanceRoute from './MenuMaintenanceRoute';

const MenuMaintenanceListing = React.lazy(() => import('../screens/MenuMaintenanceListing'));
const MenuMaintenanceDetail = React.lazy(() => import('../screens/MenuMaintenanceDetail'));

const MenuMaintenanceNavigator: NavigatorRouteType[] = [
  {
    path: MenuMaintenanceRoute.LANDING.path,
    name: MenuMaintenanceRoute.LANDING.name,
    component: MenuMaintenanceListing,
    exact: true,
  },
  {
    path: MenuMaintenanceRoute.DETAIL.path,
    name: MenuMaintenanceRoute.DETAIL.name,
    component: MenuMaintenanceDetail,
  },
];

export default MenuMaintenanceNavigator;

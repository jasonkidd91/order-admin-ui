import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import DriverRoute from './DriverMaintenanceRoute';

const DriverMaintenance = React.lazy(() => import('../screens/DriverMaintenance'));
const DriverMaintenanceCreate = React.lazy(() => import('../screens/DriverMaintenanceCreate'));
const DriverMaintenanceUpdate = React.lazy(() => import('../screens/DriverMaintenanceUpdate'));

const DriverMaintenanceNavigator: NavigatorRouteType[] = [
  {
    path: DriverRoute.LANDING.path,
    name: DriverRoute.LANDING.name,
    component: DriverMaintenance,
    exact: true,
  },
  {
    path: DriverRoute.CREATE.path,
    name: DriverRoute.CREATE.name,
    component: DriverMaintenanceCreate,
  },
  {
    path: DriverRoute.UPDATE.path,
    name: DriverRoute.UPDATE.name,
    component: DriverMaintenanceUpdate,
  },
];

export default DriverMaintenanceNavigator;

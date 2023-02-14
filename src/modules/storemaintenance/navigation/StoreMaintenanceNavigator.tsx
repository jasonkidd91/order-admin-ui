import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import StoreMaintenanceRoute from './StoreMaintenanceRoute';

const StoreMaintenance = React.lazy(() => import('../screens/StoreMaintenance'));
const StoreMaintenanceUpdate = React.lazy(() => import('../screens/StoreMaintenanceUpdate'));

const StoreMaintenanceNavigator: NavigatorRouteType[] = [
  {
    path: StoreMaintenanceRoute.LANDING.path,
    name: StoreMaintenanceRoute.LANDING.name,
    component: StoreMaintenance,
    exact: true,
  },
  {
    path: StoreMaintenanceRoute.UPDATE.path,
    name: StoreMaintenanceRoute.UPDATE.name,
    component: StoreMaintenanceUpdate,
  },
];

export default StoreMaintenanceNavigator;

import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import DriverZoneMaintenanceRoute from './DriverZoneMaintenanceRoute';

const DriverZoneMaintenance = React.lazy(() => import('../screens/DriverZoneMaintenance'));

const DriverZoneMaintenanceNavigator: NavigatorRouteType[] = [
  {
    path: DriverZoneMaintenanceRoute.LANDING.path,
    name: DriverZoneMaintenanceRoute.LANDING.name,
    component: DriverZoneMaintenance,
    exact: true,
  },
];

export default DriverZoneMaintenanceNavigator;

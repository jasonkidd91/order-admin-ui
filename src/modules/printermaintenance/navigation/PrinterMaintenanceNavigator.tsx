import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import PrinterMaintenanceRoute from './PrinterMaintenanceRoute';

const PrinterMaintenance = React.lazy(() => import('../screens/PrinterMaintenance'));

const PrinterMaintenanceNavigator: NavigatorRouteType[] = [
  {
    path: PrinterMaintenanceRoute.LANDING.path,
    name: PrinterMaintenanceRoute.LANDING.name,
    component: PrinterMaintenance,
    exact: true,
  },
];

export default PrinterMaintenanceNavigator;

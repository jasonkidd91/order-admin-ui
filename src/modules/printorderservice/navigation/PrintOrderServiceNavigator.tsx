import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import PrintOrderServiceRoute from './PrintOrderServiceRoute';

const PrintOrderService = React.lazy(() => import('../screens/PrintOrderService'));

const PrintOrderServiceNavigator: NavigatorRouteType[] = [
  {
    path: PrintOrderServiceRoute.LANDING.path,
    name: PrintOrderServiceRoute.LANDING.name,
    component: PrintOrderService,
  },
];

export default PrintOrderServiceNavigator;

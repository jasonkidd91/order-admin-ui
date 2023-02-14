import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import OrderMaintenanceRoute from './OrderMaintenanceRoute';

const OrderGeneral = React.lazy(() => import('../screens/OrderGeneral'));
// const CustomerCreate = React.lazy(() => import('../screens/CustomerCreate'));
// const CustomerUpdate= React.lazy(() => import('../screens/CustomerUpdate'));

const OrderMaintenanceNavigator: NavigatorRouteType[] = [
  {
    path: OrderMaintenanceRoute.FILTERSTATUS.path,
    name: OrderMaintenanceRoute.FILTERSTATUS.name,
    component: OrderGeneral,
  },
  {
    path: OrderMaintenanceRoute.GENERAL.path,
    name: OrderMaintenanceRoute.GENERAL.name,
    component: OrderGeneral,
  },
  //   { path: CustomerRoute.CREATE.path, name: CustomerRoute.CREATE.name, component: CustomerCreate },
  //   { path: CustomerRoute.UPDATE.path, name: CustomerRoute.UPDATE.name, component: CustomerUpdate },
];

export default OrderMaintenanceNavigator;

import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import OrderMaintenancePlanRoute from './OrderMaintenancePlanRoute';

const OrderMaintenancePlan = React.lazy(() => import('../screens/OrderMaintenancePlan'));
// const CustomerCreate = React.lazy(() => import('../screens/CustomerCreate'));
// const CustomerUpdate= React.lazy(() => import('../screens/CustomerUpdate'));

const OrderMaintenancePlanNavigator: NavigatorRouteType[] = [
  {
    path: OrderMaintenancePlanRoute.LANDING.path,
    name: OrderMaintenancePlanRoute.LANDING.name,
    component: OrderMaintenancePlan,
    exact: true,
  },
  //   { path: CustomerRoute.CREATE.path, name: CustomerRoute.CREATE.name, component: CustomerCreate },
  //   { path: CustomerRoute.UPDATE.path, name: CustomerRoute.UPDATE.name, component: CustomerUpdate },
];

export default OrderMaintenancePlanNavigator;

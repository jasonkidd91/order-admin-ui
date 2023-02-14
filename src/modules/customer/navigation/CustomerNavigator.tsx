import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import CustomerRoute from './CustomerRoute';

const Customer = React.lazy(() => import('../screens/Customer'));
const CustomerCreate = React.lazy(() => import('../screens/CustomerCreate'));
const CustomerUpdate = React.lazy(() => import('../screens/CustomerUpdate'));

const CustomerNavigator: NavigatorRouteType[] = [
  {
    path: CustomerRoute.LANDING.path,
    name: CustomerRoute.LANDING.name,
    component: Customer,
    exact: true,
  },
  { path: CustomerRoute.CREATE.path, name: CustomerRoute.CREATE.name, component: CustomerCreate },
  { path: CustomerRoute.UPDATE.path, name: CustomerRoute.UPDATE.name, component: CustomerUpdate },
];

export default CustomerNavigator;

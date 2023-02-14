import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import OrderRoute from './OrderRoute';

const AddOrder = React.lazy(() => import('../screens/AddOrder'));

const OrderNavigator: NavigatorRouteType[] = [
  { path: OrderRoute.ADD_ORDER.path, name: OrderRoute.ADD_ORDER.name, component: AddOrder },
];

export default OrderNavigator;

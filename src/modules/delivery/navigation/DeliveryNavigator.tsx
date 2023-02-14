import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import DeliveryRoute from './DeliveryRoute';

const Delivery = React.lazy(() => import('../screens/Delivery'));
const DeliveryCreate = React.lazy(() => import('../screens/DeliveryCreate'));
const DeliveryUpdate = React.lazy(() => import('../screens/DeliveryUpdate'));

const DeliveryNavigator: NavigatorRouteType[] = [
  {
    path: DeliveryRoute.LANDING.path,
    name: DeliveryRoute.LANDING.name,
    component: Delivery,
    exact: true,
  },
  {
    path: DeliveryRoute.LANDING_STORE.path,
    name: DeliveryRoute.LANDING_STORE.name,
    component: Delivery,
    exact: true,
  },
  { path: DeliveryRoute.CREATE.path, name: DeliveryRoute.CREATE.name, component: DeliveryCreate },
  { path: DeliveryRoute.UPDATE.path, name: DeliveryRoute.UPDATE.name, component: DeliveryUpdate },
];

export default DeliveryNavigator;

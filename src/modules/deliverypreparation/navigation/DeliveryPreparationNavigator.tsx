import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import DeliveryPreparationRoute from './DeliveryPreparationRoute';

const DeliveryPreparationListing = React.lazy(
  () => import('../screens/DeliveryPreparationListing'),
);
const DeliveryPreparationCreate = React.lazy(() => import('../screens/DeliveryPreparationCreate'));
const DeliveryPreparationDetail = React.lazy(() => import('../screens/DeliveryPreparationDetail'));
const DeliveryPreparationUpdate = React.lazy(() => import('../screens/DeliveryPreparationUpdate'));

const DeliveryPreparationNavigator: NavigatorRouteType[] = [
  {
    path: DeliveryPreparationRoute.LANDING.path,
    name: DeliveryPreparationRoute.LANDING.name,
    component: DeliveryPreparationListing,
    exact: true,
  },
  {
    path: DeliveryPreparationRoute.CREATE.path,
    name: DeliveryPreparationRoute.CREATE.name,
    component: DeliveryPreparationCreate,
  },
  {
    path: DeliveryPreparationRoute.DETAIL.path,
    name: DeliveryPreparationRoute.DETAIL.name,
    component: DeliveryPreparationDetail,
  },
  {
    path: DeliveryPreparationRoute.UPDATE.path,
    name: DeliveryPreparationRoute.UPDATE.name,
    component: DeliveryPreparationUpdate,
  },
];

export default DeliveryPreparationNavigator;

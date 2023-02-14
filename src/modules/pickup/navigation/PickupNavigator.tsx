import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import PickupRoute from './PickupRoute';

const Pickup = React.lazy(() => import('../screens/Pickup'));
const PickupCreate = React.lazy(() => import('../screens/PickupCreate'));
const PickupUpdate = React.lazy(() => import('../screens/PickupUpdate'));

const PickupNavigator: NavigatorRouteType[] = [
  {
    path: PickupRoute.LANDING.path,
    name: PickupRoute.LANDING.name,
    component: Pickup,
    exact: true,
  },
  {
    path: PickupRoute.LANDING_STORE.path,
    name: PickupRoute.LANDING_STORE.name,
    component: Pickup,
    exact: true,
  },
  { path: PickupRoute.CREATE.path, name: PickupRoute.CREATE.name, component: PickupCreate },
  { path: PickupRoute.UPDATE.path, name: PickupRoute.UPDATE.name, component: PickupUpdate },
];

export default PickupNavigator;

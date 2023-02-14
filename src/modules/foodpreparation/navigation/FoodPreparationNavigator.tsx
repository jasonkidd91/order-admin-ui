import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import FoodPreparationRoute from './FoodPreparationRoute';

const FoodPreparation = React.lazy(() => import('../screens/FoodPreparation'));
// const CustomerCreate = React.lazy(() => import('../screens/CustomerCreate'));
// const CustomerUpdate= React.lazy(() => import('../screens/CustomerUpdate'));

const FoodPreparationNavigator: NavigatorRouteType[] = [
  {
    path: FoodPreparationRoute.LANDING.path,
    name: FoodPreparationRoute.LANDING.name,
    component: FoodPreparation,
    exact: true,
  },
  //   { path: CustomerRoute.CREATE.path, name: CustomerRoute.CREATE.name, component: CustomerCreate },
  //   { path: CustomerRoute.UPDATE.path, name: CustomerRoute.UPDATE.name, component: CustomerUpdate },
];

export default FoodPreparationNavigator;

import React from 'react';
import { NavigatorRouteType } from 'src/routes';
import PlanRoute from './PlanRoute';

const AddPlan = React.lazy(() => import('../screens/AddPlan'));

const PlanNavigator: NavigatorRouteType[] = [
  { path: PlanRoute.ADD_PLAN.path, name: PlanRoute.ADD_PLAN.name, component: AddPlan },
];

export default PlanNavigator;

import DashboardNavigator from './modules/dashboard/navigation/DashboardNavigator';
import CustomerNavigator from './modules/customer/navigation/CustomerNavigator';
import OrderNavigator from './modules/order/navigation/OrderNavigator';
import FoodPreparationNavigator from './modules/foodpreparation/navigation/FoodPreparationNavigator';
import DeliveryNavigator from './modules/delivery/navigation/DeliveryNavigator';
import PickupNavigator from './modules/pickup/navigation/PickupNavigator';
import OrderMaintenanceNavigator from './modules/ordermaintenance/navigation/OrderMaintenanceNavigator';
import OrderMaintenanceRoute from './modules/ordermaintenance/navigation/OrderMaintenanceRoute';
import PlanNavigator from './modules/orderplan/navigation/PlanNavigator';
import OrderMaintenancePlanNavigator from './modules/orderplanmaintenance/navigation/OrderMaintenancePlanNavigator';
import DeliveryPreparationNavigator from './modules/deliverypreparation/navigation/DeliveryPreparationNavigator';
import DriverMaintenanceNavigator from './modules/drivermaintenance/navigation/DriverMaintenanceNavigator';
import DriverZoneMaintenanceNavigator from './modules/driverzonemaintenance/navigation/DriverZoneMaintenanceNavigator';

import PrinterMaintenanceNavigator from './modules/printermaintenance/navigation/PrinterMaintenanceNavigator';
import { OrderGeneralStatus } from './modules/ordermaintenance/constants';
import StoreMaintenanceNavigator from './modules/storemaintenance/navigation/StoreMaintenanceNavigator';
import PrintOrderServiceNavigator from './modules/printorderservice/navigation/PrintOrderServiceNavigator';
import MenuMaintenanceNavigator from './modules/menumaintenance/navigation/MenuMaintenanceNavigator';

export type NavigatorRouteType = {
  path: string;
  name: string;
  exact?: boolean;
  component?: any;
  redirect?: any;
};

const routes: NavigatorRouteType[] = [
  // add all modules navigator route
  ...DashboardNavigator,
  ...CustomerNavigator,
  ...OrderNavigator,
  ...PlanNavigator,
  ...FoodPreparationNavigator,
  ...DeliveryNavigator,
  ...PickupNavigator,
  ...OrderMaintenanceNavigator,
  ...OrderMaintenancePlanNavigator,
  ...DeliveryPreparationNavigator,
  ...DriverMaintenanceNavigator,
  ...DriverZoneMaintenanceNavigator,
  ...PrinterMaintenanceNavigator,
  ...StoreMaintenanceNavigator,
  ...PrintOrderServiceNavigator,
  ...MenuMaintenanceNavigator,
].concat(
  // default path
  {
    path: '/',
    name: 'Default',
    redirect: OrderMaintenanceRoute.GENERAL.path + OrderGeneralStatus.CONFIRMED,
  },
);

export default routes;

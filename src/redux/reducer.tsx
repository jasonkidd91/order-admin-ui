import { combineReducers } from '@reduxjs/toolkit';
import { RESET_APP_STATE } from './action';
import appSlice from './slice';
import authSlice from 'src/modules/auth/redux/authSlice';
import dashboardSlice from 'src/modules/dashboard/redux/dashboardSlice';
import customerSlice from 'src/modules/customer/redux/customerSlice';
import orderSlice from 'src/modules/order/redux/orderSlice';
import foodpreparationSlice from 'src/modules/foodpreparation/redux/foodPreparationSlice';
import deliverySlice from 'src/modules/delivery/redux/deliverySlice';
import pickupSlice from 'src/modules/pickup/redux/pickupSlice';
import orderMaintenanceSlice from 'src/modules/ordermaintenance/redux/orderMaintenanceSlice';
import planSlice from 'src/modules/orderplan/redux/planSlice';
import planEndInfoListSlice from 'src/modules/orderplanmaintenance/redux/planEndInfoListSlice';
import deliveryPreparationSlice from 'src/modules/deliverypreparation/redux/deliveryPreparationSlice';
import driverSlice from 'src/modules/drivermaintenance/redux/driverSlice';
import driverZoneSlice from 'src/modules/driverzonemaintenance/redux/driverZoneSlice';
import printerMaintenanceSlice from 'src/modules/printermaintenance/redux/printerMaintenanceSlice';
import storeMaintenanceSlice from 'src/modules/storemaintenance/redux/storeMaintenanceSlice';
import printOrderServiceSlice from 'src/modules/printorderservice/redux/printOrderServiceSlice';
import menuMaintenanceSlice from 'src/modules/menumaintenance/redux/menuMaintenanceSlice';

const appReducer = combineReducers({
  // add all module reducers
  app: appSlice,
  auth: authSlice,
  dashboard: dashboardSlice,
  customer: customerSlice,
  order: orderSlice,
  plan: planSlice,
  foodpreparation: foodpreparationSlice,
  delivery: deliverySlice,
  pickup: pickupSlice,
  ordermaintenance: orderMaintenanceSlice,
  planEndInfoList: planEndInfoListSlice,
  deliverypreparation: deliveryPreparationSlice,
  driver: driverSlice,
  driverZone: driverZoneSlice,
  printermaintenance: printerMaintenanceSlice,
  storemaintenance: storeMaintenanceSlice,
  printOrderService: printOrderServiceSlice,
  menuMaintenance: menuMaintenanceSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_APP_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

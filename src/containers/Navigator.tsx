import CIcon from '@coreui/icons-react';
import CustomerRoute from 'src/modules/customer/navigation/CustomerRoute';
import DeliveryPreparationRoute from 'src/modules/deliverypreparation/navigation/DeliveryPreparationRoute';
import FoodPreparationRoute from 'src/modules/foodpreparation/navigation/FoodPreparationRoute';
import OrderMaintenancePlanRoute from 'src/modules/orderplanmaintenance/navigation/OrderMaintenancePlanRoute';

const isPath = (path: string, returnValue: any) => {
  return window.location.pathname.split('/')[1] === path ? returnValue : '';
};

const _nav = [
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: DashboardRoute.LANDING.name,
  //   to: DashboardRoute.LANDING.path,
  //   icon: <CIcon name="cil-laptop" customClasses="c-sidebar-nav-icon" />,
  //   // badge: {
  //   //   color: 'info',
  //   //   text: 'NEW',
  //   // }
  // },
  {
    _tag: 'CSidebarNavItem',
    name: CustomerRoute.LANDING.name,
    to: CustomerRoute.LANDING.path,
    icon: <CIcon name="cil-user" customClasses="c-sidebar-nav-icon" />,
  },
  {
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
    _tag: 'CSidebarNavDropdown',
    name: 'Order',
    icon: 'cil-restaurant',
    className: `${isPath('order', 'c-show')}`,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Àla Carte',
        to: '/order/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Plan',
        to: '/plan/add',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'General',
        to: '/order/general/',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pending',
        to: '/order/general/0',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Confirmed',
        to: '/order/general/1',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Void',
        to: '/order/general/2',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Print Service',
        to: '/printorderservice',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: FoodPreparationRoute.LANDING.name,
    to: FoodPreparationRoute.LANDING.path,
    icon: <CIcon name="cil-dinner" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: DeliveryPreparationRoute.LANDING.name,
    to: DeliveryPreparationRoute.LANDING.path,
    icon: <CIcon name="cil-truck" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavItem',
    name: OrderMaintenancePlanRoute.LANDING.name,
    to: OrderMaintenancePlanRoute.LANDING.path,
    icon: <CIcon name="cil-calendar-check" customClasses="c-sidebar-nav-icon" />,
  },
  {
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
    _tag: 'CSidebarNavDropdown',
    name: 'Maintenance',
    icon: 'cil-cog',
    className: `${isPath('maintenance', 'c-show')}`,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Menu Maintenance',
        to: '/maintenance/menu',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Delivery Maintenance',
        to: '/maintenance/delivery',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pickup Maintenance',
        to: '/maintenance/pickup',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Driver Maintenance',
        to: '/drivermaintenance',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Driver Zone Maintenance',
        to: '/maintenance/driverzonemaintenance',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Printer Maintenance',
        to: '/printermaintenance',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Store Maintenance',
        to: '/storemaintenance',
      },
    ],
  },
];

export default _nav;

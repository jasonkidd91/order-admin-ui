const DeliveryRoute = {
  LANDING: {
    path: '/maintenance/delivery',
    name: 'Delivery',
  },
  LANDING_STORE: {
    path: '/maintenance/delivery/:store_id',
    name: 'Delivery',
  },
  CREATE: {
    path: '/maintenance/delivery/create/:store_id',
    name: 'DeliveryCreate',
  },
  UPDATE: {
    path: '/maintenance/delivery/update/:id',
    name: 'DeliveryUpdate',
  },
};

export default DeliveryRoute;

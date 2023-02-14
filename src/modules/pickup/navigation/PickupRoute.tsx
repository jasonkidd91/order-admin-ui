const PickupRoute = {
  LANDING: {
    path: '/maintenance/pickup',
    name: 'Pickup',
  },
  LANDING_STORE: {
    path: '/maintenance/pickup/:store_id',
    name: 'Pickup',
  },
  CREATE: {
    path: '/maintenance/pickup/create/:store_id',
    name: 'PickupCreate',
  },
  UPDATE: {
    path: '/maintenance/pickup/update/:id',
    name: 'PickupUpdate',
  },
};

export default PickupRoute;

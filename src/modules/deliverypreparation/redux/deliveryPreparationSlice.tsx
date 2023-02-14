import { createSlice } from '@reduxjs/toolkit';
import { DeliveryPreparationState } from './types';
import Api from '../api/Api';

const initialState: DeliveryPreparationState = {
  itemListPayload: null,
  availableSlots: [],
  deliveryDriverList: [],
  stores: [],
  deliveryDetail: null,
  deliveryOrders: [],
};

const deliveryPreparationSlice = createSlice({
  name: 'deliverypreparation',
  initialState,
  reducers: {
    setItemListPayload: (state, action) => {
      return {
        ...state,
        itemListPayload: action.payload,
      };
    },
    setAvailableSlots: (state, action) => {
      return {
        ...state,
        availableSlots: action.payload,
      };
    },
    setDeliveryDriverList: (state, action) => {
      return {
        ...state,
        deliveryDriverList: action.payload,
      };
    },
    setStores: (state, action) => {
      return {
        ...state,
        stores: action.payload,
      };
    },
    setDeliveryDetail: (state, action) => {
      return {
        ...state,
        deliveryDetail: action.payload,
      };
    },
    setDriverZoneListPayload: (state, action) => {
      return {
        ...state,
        driverZoneListPayload: action.payload,
      };
    },
    setZoneOrderListPayload: (state, action) => {
      return {
        ...state,
        zoneOrderListPayload: action.payload,
      };
    },
    setZoneOrderDetailsPayload: (state, action) => {
      return {
        ...state,
        zoneOrderDetailsPayload: action.payload,
      };
    },
  },
});

// actions
export const {
  setItemListPayload,
  setAvailableSlots,
  setDeliveryDriverList,
  setStores,
  setDeliveryDetail,
  setDriverZoneListPayload,
  setZoneOrderListPayload,
  setZoneOrderDetailsPayload,
} = deliveryPreparationSlice.actions;

export const getItemListPayload = (auth: any, page?: any) => {
  return (dispatch: any) => {
    return new Api(auth).getItemList(page).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('deliveryPreparation::getItemListPayload', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setItemListPayload(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getStores = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth).getStores().then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getStoreSlots', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setStores(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getStoreSlots = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth).getStoreSlots().then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          console.log('order::getStoreSlots', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setAvailableSlots(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const getDeliveryDriverList = (auth: any, id: any) => {
  if (id) {
    return (dispatch: any) => {
      return new Api(auth).getDeliveryDriversWithPreparationId(id).then((res) => {
        if (res.data) {
          const { errors, data } = res.data;
          if (errors) {
            let errorMessage = errors instanceof Array ? errors[0] : errors;
            throw new Error(errorMessage);
          } else {
            dispatch(setDeliveryDriverList(data));
            return data;
          }
        } else {
          throw new Error('Server error, please try again later..');
        }
      });
    };
  }

  return (dispatch: any) => {
    return new Api(auth).getDeliveryDrivers().then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          dispatch(setDeliveryDriverList(data));
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const createDeliveryPlan = (auth: any, delivery: object) => {
  // return (dispatch: any) => {
  return new Api(auth).createDeliveryPlan(delivery).then((res) => {
    if (res.code !== 200) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('create::createDeliveryPlan', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const deleteDeliveryPlan = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth).deleteDeliveryPlan(id).then((res) => {
    if (res.code !== 200) {
      const { errors, data } = res.data;
      if (errors) {
        console.log('create::deleteDeliveryPlan', errors);
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const getDeliveryPlanDetail = (auth: any, id: any) => {
  return (dispatch: any) => {
    return new Api(auth).getDeliveryPlanDetail(id).then((res) => {
      if (res.data) {
        const { errors, data } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          throw new Error(errorMessage);
        } else {
          // if (data.orders) {
          dispatch(setDeliveryDetail(data));
          // }
          return data;
        }
      } else {
        throw new Error('Server error, please try again later..');
      }
    });
  };
};

export const refreshDeliveryPlanDetail = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth).refreshDeliveryPlanDetail(id).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        // if (data.orders) {
        // dispatch();
        // }
        // alert("test");
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const assignDriver = (auth: any, body: any) => {
  // return (dispatch: any) => {
  return new Api(auth).assginDriver(body).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const assignDriverOrderList = (auth: any, body: any) => {
  // return (dispatch: any) => {
  return new Api(auth).assignDriverOrderList(body).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const assignDriverOrderIndividual = (auth: any, body: any) => {
  // return (dispatch: any) => {
  return new Api(auth).assignDriverOrderIndividual(body).then((res) => {
    if (res.data) {
      const { errors, data } = res.data;
      if (errors) {
        let errorMessage = errors instanceof Array ? errors[0] : errors;
        throw new Error(errorMessage);
      } else {
        return data;
      }
    } else {
      throw new Error('Server error, please try again later..');
    }
  });
  // };
};

export const downloadDeliveryPlan = (auth: any, deliveryid: any) => {
  return (
    new Api(auth)
      .downloadDeliveryPlan('delivery_plan.xlsx', deliveryid)
      // .then(res => res.blob())
      .catch((error) => {
        console.error(error);
      })
  );
};

export const getDriverZoneList = (auth: any, id: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getDriverZoneList(id)
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            // let errorMessage = errors instanceof Array ? errors[0] : errors;
            // dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(setDriverZoneListPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getZoneOrderDetails = (auth: any, body: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getZoneOrderDetails(body)
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            // let errorMessage = errors instanceof Array ? errors[0] : errors;
            // dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(setZoneOrderDetailsPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getZoneOrderList = (auth: any, body: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getZoneOrderList(body)
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            // let errorMessage = errors instanceof Array ? errors[0] : errors;
            // dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(setZoneOrderListPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default deliveryPreparationSlice.reducer;

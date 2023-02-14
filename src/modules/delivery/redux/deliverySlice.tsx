import { createSlice } from '@reduxjs/toolkit';
import { DeliveryState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: DeliveryState = {};

const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    deliveryListPayload: (state, action) => {
      return {
        ...state,
        deliveryListPayload: action.payload,
      };
    },
    storeListPayload: (state, action) => {
      return {
        ...state,
        storeListPayload: action.payload,
      };
    },
    setZoneListPayload: (state, action) => {
      return {
        ...state,
        zoneListPayload: action.payload,
      };
    },
  },
});

// actions
export const { deliveryListPayload, storeListPayload, setZoneListPayload } = deliverySlice.actions;

// export const getMockData = () => {
//   return (dispatch: any) => dispatch(mockPayload(mockData));
// };

// export const getReduxData = (auth: any) => {
//   return (dispatch: any) => {
//     return new Api(auth)
//       .getCustomerData()
//       .then((result) => {
//         dispatch(customerListPayload(result));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
// };

export const getReduxDataList = (auth: any, store_id: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getDeliveryDataListBasedOnStore(1, store_id)
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            let errorMessage = errors instanceof Array ? errors[0] : errors;
            dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(deliveryListPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const resetReduxDataList = () => {
  return (dispatch: any) => {
    return dispatch(deliveryListPayload({}));
  };
};

export const createDelivery = (auth: any, delivery: object) => {
  return (dispatch: any) => {
    new Api(auth).createDelivery(delivery).then((res) => {
      if (res.code !== 200) {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Delivery Slot Data Created!'));
          // console.log('JS Testing ', res?.data?.data)
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const updateDelivery = (auth: any, id: any, delivery: object) => {
  return (dispatch: any) => {
    new Api(auth).updateDelivery(delivery, id).then((res) => {
      if (res.code !== 200) {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Delivery Slot Data Created!'));
          // console.log('JS Testing ', res?.data?.data)
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const getStoreList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getStoreList()
      .then((result) => {
        dispatch(storeListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getStoreDetails = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .getStoreDetails(id)
    .then((result) => {
      return result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // };
};

export const getSlotDetails = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .getSlotDetails(id)
    .then((result) => {
      return result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // };
};

export const deleteDelivery = (auth: any, id: any, store_id: any) => {
  return (dispatch: any) => {
    new Api(auth).deleteSlotDetails(id).then((res) => {
      if (res.code === 200) {
        const { errors } = res;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Slot Data Deleted!'));
          dispatch(getReduxDataList(auth, store_id));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const getZoneListBasedOnStores = (auth: any, store_id: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getZoneListBasedOnStore(store_id)
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            let errorMessage = errors instanceof Array ? errors[0] : errors;
            dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(setZoneListPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default deliverySlice.reducer;

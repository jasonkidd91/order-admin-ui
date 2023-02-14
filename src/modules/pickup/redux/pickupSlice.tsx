import { createSlice } from '@reduxjs/toolkit';
import { PickupState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: PickupState = {};

const pickupSlice = createSlice({
  name: 'pickup',
  initialState,
  reducers: {
    pickupListPayload: (state, action) => {
      return {
        ...state,
        pickupListPayload: action.payload,
      };
    },
    storeListPayload: (state, action) => {
      return {
        ...state,
        storeListPayload: action.payload,
      };
    },
  },
});

// actions
export const { pickupListPayload, storeListPayload } = pickupSlice.actions;

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
      .getPickupDataListBasedOnStore(2, store_id)
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            let errorMessage = errors instanceof Array ? errors[0] : errors;
            dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(pickupListPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const resetReduxDataList = () => {
  return (dispatch: any) => {
    return dispatch(pickupListPayload({}));
  };
};

export const createPickup = (auth: any, pickup: object) => {
  return (dispatch: any) => {
    new Api(auth).createPickup(pickup).then((res) => {
      if (res.code !== 200) {
        const { errors } = res;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Pickup Slot Data Created!'));
          // console.log('JS Testing ', res?.data?.data)
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const updatePickup = (auth: any, id: any, pickup: object) => {
  return (dispatch: any) => {
    new Api(auth).updatePickup(pickup, id).then((res) => {
      if (res.code !== 200) {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Pickup Slot Data Created!'));
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

export const deletePickup = (auth: any, id: any, store_id: any) => {
  return (dispatch: any) => {
    new Api(auth).deleteSlotDetails(id).then((res) => {
      if (res.code === '200') {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
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

export default pickupSlice.reducer;

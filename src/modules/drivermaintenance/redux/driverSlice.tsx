import { createSlice } from '@reduxjs/toolkit';
import { DriverState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: DriverState = {};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    mockPayload: (state, action) => {
      return {
        ...state,
        mockPayload: action.payload,
      };
    },
    driverListPayload: (state, action) => {
      return {
        ...state,
        driverListPayload: action.payload,
      };
    },
    driverPayload: (state, action) => {
      return {
        ...state,
        driverPayload: action.payload,
      };
    },
    driverSearchPayload: (state, action) => {
      return {
        ...state,
        driverSearchPayload: action.payload,
      };
    },
    driverAddressPayload: (state, action) => {
      return {
        ...state,
        driverAddressPayload: action.payload,
      };
    },
    addressPayload: (state, action) => {
      return {
        ...state,
        driverPayload: action.payload,
      };
    },
  },
});

// actions
export const {
  mockPayload,
  driverListPayload,
  driverPayload,
  driverSearchPayload,
  driverAddressPayload,
  addressPayload,
} = driverSlice.actions;

// export const getMockData = () => {
//   return (dispatch: any) => dispatch(mockPayload(mockData));
// };

export const getDriverList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getDriverData()
      .then((result) => {
        dispatch(driverListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getDriverData = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .retrieveDriver(id)
    .then((result) => {
      // console.log("The driver data return ")
      // console.log(result)
      return result.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // };
};

export const createDriver = (auth: any, driver: object, history: any) => {
  return (dispatch: any) => {
    new Api(auth).createDriver(driver).then((res) => {
      if (res.status === 200) {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createDriver', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Driver Data Created!'));
          // console.log('JS Testing ', res?.data?.data)
          history.push(`/drivermaintenance`);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const updateDriver = (auth: any, driver: object, id: any) => {
  return (dispatch: any) => {
    new Api(auth).updateDriver(driver, id).then((res) => {
      if (res.status === 200) {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Customer Data Updated!'));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const deleteDriver = (auth: any, id: any) => {
  return (dispatch: any) => {
    new Api(auth).deleteDriver(id).then((res) => {
      if (res.status === 200) {
        const { errors } = res.data;
        if (errors) {
          console.log('delete::deleteDriver', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Driver Data Deleted!'));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const getCustomerAddressData = (auth: any, id: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getCustomerAddressList(id)
      .then((result) => {
        dispatch(driverAddressPayload(result?.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export default driverSlice.reducer;

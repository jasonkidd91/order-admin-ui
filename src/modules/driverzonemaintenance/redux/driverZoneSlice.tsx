import { createSlice } from '@reduxjs/toolkit';
import { DeliveryState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: DeliveryState = {};

const driverZoneSlice = createSlice({
  name: 'driverZone',
  initialState,
  reducers: {
    setDriverZoneListPayload: (state, action) => {
      return {
        ...state,
        driverZoneListPayload: action.payload,
      };
    },
    setDriverListPayload: (state, action) => {
      return {
        ...state,
        driverListPayload: action.payload,
      };
    },
    setDriverLinkListPayload: (state, action) => {
      return {
        ...state,
        driverLinkListPayload: action.payload,
      };
    },
  },
});

// actions
export const { setDriverZoneListPayload, setDriverListPayload, setDriverLinkListPayload } =
  driverZoneSlice.actions;

export const getDriverZoneList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getDriverZoneList()
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            let errorMessage = errors instanceof Array ? errors[0] : errors;
            dispatch(globalToast('error', errorMessage));
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

export const createDriverZone = (auth: any, driverZone: any) => {
  // const driverZoneDto = {longtitude: 0, latitude: 0, radius: 0}
  // driverZoneDto.longtitude = driverZone.lng;
  // driverZoneDto.latitude = driverZone.lat;
  // driverZoneDto.radius = driverZone.radius;
  return (dispatch: any) => {
    new Api(auth).createDriverZone(driverZone).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          // console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Driver Zone Data Created!'));
          dispatch(getDriverZoneList(auth));
          // console.log('JS Testing ', res?.data?.data)
          // history.push(`/customer/view/${res?.data?.data?.id}`);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const updateDriverZone = (auth: any, driverZone: any) => {
  // const driverZoneDto = {longtitude: 0, latitude: 0, radius: 0}
  // driverZoneDto.longtitude = driverZone.lng;
  // driverZoneDto.latitude = driverZone.lat;
  // driverZoneDto.radius = driverZone.radius;
  return (dispatch: any) => {
    new Api(auth).updateDriverZone(driverZone).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          // console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Driver Zone Data Updated!'));
          dispatch(getDriverZoneList(auth));
          // console.log('JS Testing ', res?.data?.data)
          // history.push(`/customer/view/${res?.data?.data?.id}`);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const deleteDriverZone = (auth: any, driverZone: any) => {
  return (dispatch: any) => {
    new Api(auth).deleteDriverZone(driverZone).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Driver Zone Data Deleted!'));
          dispatch(getDriverZoneList(auth));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const getDriverList = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getDriverList()
      .then((result) => {
        if (result.code !== 200) {
          const { errors } = result;
          if (errors) {
            let errorMessage = errors instanceof Array ? errors[0] : errors;
            dispatch(globalToast('error', errorMessage));
          }
        } else {
          dispatch(setDriverListPayload(result));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getDriverLinkList = (auth: any, driverZone: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .getDriverLinkList(driverZone)
    .then((result) => {
      return result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const updateDriverLinkList = (auth: any, driverLinkList: object, driverZone: any) => {
  return (dispatch: any) => {
    let requestBody = { data: driverLinkList };
    new Api(auth).updateDriverLinkList(driverZone, requestBody).then((res) => {
      if (res.status === 200) {
        const { errors } = res.data;
        if (errors) {
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Driver Data Updated!'));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export default driverZoneSlice.reducer;

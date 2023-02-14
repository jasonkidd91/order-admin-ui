import { createSlice } from '@reduxjs/toolkit';
import { CustomerState } from './types';
import Api from '../api/Api';
import { globalToast } from 'src/redux/slice';

const initialState: CustomerState = {};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    mockPayload: (state, action) => {
      return {
        ...state,
        mockPayload: action.payload,
      };
    },
    customerListPayload: (state, action) => {
      return {
        ...state,
        customerListPayload: action.payload,
      };
    },
    customerPayload: (state, action) => {
      return {
        ...state,
        customerPayload: action.payload,
      };
    },
    customerSearchPayload: (state, action) => {
      return {
        ...state,
        customerSearchPayload: action.payload,
      };
    },
    customerAddressPayload: (state, action) => {
      return {
        ...state,
        customerAddressPayload: action.payload,
      };
    },
    addressPayload: (state, action) => {
      return {
        ...state,
        addressPayload: action.payload,
      };
    },
  },
});

// actions
export const {
  mockPayload,
  customerListPayload,
  customerPayload,
  customerSearchPayload,
  customerAddressPayload,
  addressPayload,
} = customerSlice.actions;

// export const getMockData = () => {
//   return (dispatch: any) => dispatch(mockPayload(mockData));
// };

export const getReduxData = (auth: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getCustomerData()
      .then((result) => {
        dispatch(customerListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getReduxDataList = (auth: any, page: any, customerSearchState: any) => {
  return (dispatch: any) => {
    return new Api(auth)
      .getCustomerDataList(page, customerSearchState)
      .then((result) => {
        dispatch(customerListPayload(result));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getCustomerData = (auth: any, id: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .retrieveCustomer(id)
    .then((result) => {
      return result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // };
};

export const createCustomer = (auth: any, customer: object, history: any) => {
  return (dispatch: any) => {
    new Api(auth).createCustomer(customer).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Customer Data Created!'));
          // console.log('JS Testing ', res?.data?.data)
          history.push(`/customer/view/${res?.data?.data?.id}`);
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const updateCustomer = (auth: any, customer: object, id: any) => {
  return (dispatch: any) => {
    new Api(auth).updateCustomer(customer, id).then((res) => {
      if (res.code !== '200') {
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

export const deleteCustomer = (auth: any, id: any) => {
  return (dispatch: any) => {
    new Api(auth).deleteCustomer(id).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Customer Data Deleted!'));
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
        dispatch(customerAddressPayload(result?.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const createCustomerAddress = (auth: any, address: any, customer_id: any) => {
  address.customer_id = customer_id;
  return (dispatch: any) => {
    new Api(auth).createCustomerAddress(address).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Customer Address Created!'));
          dispatch(getCustomerAddressData(auth, customer_id));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const getCustomerAddressDetailData = (auth: any, customer_id: any, address_id: any) => {
  // return (dispatch: any) => {
  return new Api(auth)
    .getCustomerAddress(customer_id, address_id)
    .then((result) => {
      // dispatch(addressDetailPayload(result?.data));
      return result?.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // };
};

export const updateCustomerAddress = (auth: any, address: any, customer_id: any) => {
  address.customer_id = customer_id;
  return (dispatch: any) => {
    new Api(auth).updateCustomerAddress(address).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Customer Address Updated!'));
          dispatch(getCustomerAddressData(auth, customer_id));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export const deleteCustomerAddress = (auth: any, customer_id: any, address_id: any) => {
  return (dispatch: any) => {
    new Api(auth).deleteCustomerAddress(customer_id, address_id).then((res) => {
      if (res.code !== '200') {
        const { errors } = res.data;
        if (errors) {
          console.log('create::createCustomer', errors);
          let errorMessage = errors instanceof Array ? errors[0] : errors;
          dispatch(globalToast('error', errorMessage));
        } else {
          dispatch(globalToast('success', 'Customer Address Deleted!'));
          dispatch(getCustomerAddressData(auth, customer_id));
        }
      } else {
        dispatch(globalToast('error', 'Server error, please try again later..'));
      }
    });
  };
};

export default customerSlice.reducer;

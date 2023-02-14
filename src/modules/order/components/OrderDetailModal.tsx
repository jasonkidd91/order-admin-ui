import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import {
  clearOrderState,
  getCustomerAddresses,
  getStoreSlots,
  searchCustomers,
  setOrderDetail,
  setSelectedStore,
  submitOrder,
  updateOrder,
} from '../redux/orderSlice';
import {
  CCol,
  CFormGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CSelect,
} from '@coreui/react';
import OrderCheckout from 'src/components/OrderCheckout';
import Chip from 'src/components/Chip';
import GooglePlaceAutocomplete from 'src/components/GooglePlaceAutocomplete';
import Autocomplete from 'src/components/Autocomplete';
import { formatAddress, jsonParseSafe, jsonStringifySafe } from 'src/helpers';
import { globalToast } from 'src/redux/slice';
import { ScreenState } from '../redux/types';

let timer: NodeJS.Timeout;

interface DetailProps {
  show: boolean;
  onCloseHandler: Function;
}

const OrderDetailModal = (props: DetailProps) => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const { show, onCloseHandler } = props;
  const [isLoadingCustomer, setIsLoadingCustomer] = React.useState(false);
  const [customerList, setCustomerList] = React.useState([]);
  const [addressList, setAddressList] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState<any>({});
  const [auth, orderState] = useSelector((state: any) => [state.auth, state.order] as const);
  const {
    screenState,
    availableStores,
    availableSlots,
    selectedMenu,
    selectedStore,
    cartList,
    orderDetail,
  } = orderState;

  const switchStoreHandler = (ev: any) => {
    const value = jsonParseSafe(ev.target.value);
    if (value && value !== selectedStore) {
      try {
        dispatch(setSelectedStore(value));
        dispatch(getStoreSlots(auth, value.id));
        // reset selected slot
        dispatch(setOrderDetail({ ...orderDetail, slot_id: '' }));
      } catch (err: any) {
        dispatch(globalToast('error', err?.message));
      }
    }
  };

  const switchDeliveryMethodHandler = (ev: any) => {
    const value = ev.target.value;
    let payload: any = { slot_type: value };
    if (Number(value) === 2) {
      // reset deliveryAddress if method is pickup
      payload = {
        ...payload,
        slot_id: '',
        delivery_address_1: '',
        delivery_address_2: '',
        delivery_address_3: '',
        delivery_postal: '',
        delivery_city: '',
        delivery_state: '',
        delivery_country: 'Malaysia',
        coordinate: null,
      };
    }
    dispatch(setOrderDetail({ ...orderDetail, ...payload }));
  };

  const updateOrderDetailHandler = (key: string, value: any) => {
    dispatch(setOrderDetail({ ...orderDetail, [key]: value }));
  };

  const searchCustomerHandler = async (ev: any) => {
    clearTimeout(timer);
    const value = ev.target.value;
    setIsLoadingCustomer(true);
    timer = setTimeout(async () => {
      if (value) {
        const res = await searchCustomers(auth, value);
        setCustomerList(res);
      } else {
        setCustomerList([]);
      }
      setIsLoadingCustomer(false);
    }, 500);
  };

  const selectCustomerHandler = (customer: any) => {
    const { id: customer_id, first_name, last_name, email, phone_no, remarks } = customer;
    dispatch(
      setOrderDetail({
        ...orderDetail,
        customer_id,
        first_name,
        last_name,
        email,
        phone_no,
        customer_remark: remarks,
      }),
    );
  };

  const removeCustomerHandler = () => {
    dispatch(
      setOrderDetail({
        ...orderDetail,
        // reset customer info
        customer_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_no: '',
        customer_remark: '',
        // reset address info
        address_id: '',
        delivery_address_1: '',
        delivery_address_2: '',
        delivery_address_3: '',
        delivery_postal: '',
        delivery_city: '',
        delivery_state: '',
        delivery_country: 'Malaysia',
        delivery_remark: '',
        coordinate: null,
      }),
    );
  };

  const selectCustomerAddressHandler = (ev: any) => {
    let address = jsonParseSafe(ev.target.value, {});
    setSelectedAddress(address);

    const { address_1, address_2, address_3 } = address;
    const delivery_address_1 = [address_1, address_2, address_3].filter(Boolean).join(', ');

    const coordinate =
      address.latitude && address.longtitude
        ? { lat: address.latitude, lng: address.longtitude }
        : null;

    dispatch(
      setOrderDetail({
        ...orderDetail,
        address_id: address.id,
        coordinate,
        delivery_address_1: delivery_address_1 || '',
        delivery_postal: address.postal || '',
        delivery_city: address.city || '',
        delivery_state: address.state || '',
        delivery_country: address.country || 'Malaysia',
        delivery_remark: address.remarks || '',
      }),
    );
  };

  const selectAddressHandler = (googlePlaceObject: any) => {
    const { address, addressline, coordinate } = googlePlaceObject;

    dispatch(
      setOrderDetail({
        ...orderDetail,
        address_id: '',
        coordinate,
        delivery_address_1: addressline,
        delivery_postal: address.postal_code,
        delivery_city: address.city,
        delivery_state: address.state,
        delivery_country: address.country,
      }),
    );
  };

  const validateOrder = () => {
    // store not selected
    if (!selectedStore) return false;

    if (!orderDetail.slot_type) return false;

    // customer details not defined
    // if (!orderDetail.customer_id) {
    if (!orderDetail.first_name || !orderDetail.phone_no) return false;
    // }

    // delivery address not defined
    if (Number(orderDetail.slot_type) === 1) {
      if (
        !orderDetail.delivery_address_1 ||
        !orderDetail.delivery_postal ||
        !orderDetail.delivery_city ||
        !orderDetail.delivery_state ||
        !orderDetail.delivery_country
      ) {
        return false;
      }
    }

    // delivery date not selected
    if (!orderDetail.delivery_date) return false;

    // delivery slot not selected
    if (!orderDetail.slot_id) return false;

    return true;
  };

  const submitOrderHandler = () => {
    if (!validateOrder()) {
      dispatch(
        globalToast(
          'error',
          'Unable to proceed due to missing info, please check your order detail.',
        ),
      );
      return;
    }

    if (screenState === ScreenState.EDIT) {
      // promote updated ids
      if (orderDetail.update_ids !== undefined && orderDetail.update_ids !== '') {
        if (
          // eslint-disable-next-line
          confirm(
            'You are about to update ' +
              orderDetail.update_ids +
              ' follow ' +
              orderDetail.id +
              ' changes',
          )
        ) {
          // update existing order
          updateOrder(auth, {
            menu: selectedMenu,
            store: selectedStore,
            order_detail: orderDetail,
            items: cartList,
          })
            .then(() => {
              dispatch(globalToast('success', 'Order has been updated'));
              onCloseHandler();
            })
            .catch((err: any) => dispatch(globalToast('error', err?.message)));
        }
      } else {
        updateOrder(auth, {
          menu: selectedMenu,
          store: selectedStore,
          order_detail: orderDetail,
          items: cartList,
        })
          .then(() => {
            dispatch(globalToast('success', 'Order has been updated'));
            onCloseHandler();
          })
          .catch((err: any) => dispatch(globalToast('error', err?.message)));
      }
    } else {
      // create new order
      submitOrder(auth, {
        menu: selectedMenu,
        store: selectedStore,
        order_detail: orderDetail,
        items: cartList,
      })
        .then(() => {
          dispatch(clearOrderState());
          dispatch(globalToast('success', 'Order has been added'));
          onCloseHandler();
        })
        .catch((err: any) => dispatch(globalToast('error', err?.message)));
    }
  };

  React.useEffect(() => {
    // on select customer effect
    // - retrieve customer addresses
    if (orderDetail.customer_id) {
      getCustomerAddresses(auth, orderDetail.customer_id)
        .then((data) => setAddressList(data))
        .catch(() => setAddressList([]));
    }
  }, [orderDetail.customer_id]);

  return (
    <CModal show={show} size="lg" centered={true} closeOnBackdrop={false} onClose={onCloseHandler}>
      <CModalHeader closeButton>
        <CModalTitle>Order Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <OrderCheckout
          switchStoreHandler={switchStoreHandler}
          switchDeliveryMethodHandler={switchDeliveryMethodHandler}
          updateOrderDetailHandler={updateOrderDetailHandler}
          submitOrderHandler={submitOrderHandler}
          availableStores={availableStores}
          availableSlots={availableSlots}
          selectedStore={selectedStore}
          cartList={cartList}
          orderDetail={orderDetail}
          CustomerAutocomplete={
            <CFormGroup row>
              <CCol sm="12" md="8" className="py-2">
                <Autocomplete
                  type="search"
                  placeholder="Existing Customer"
                  iconPrepend="cil-user"
                  onChange={searchCustomerHandler}
                  suggestions={customerList}
                  shouldRender={!isLoadingCustomer}
                  renderItem={(customer: any) => (
                    <div
                      key={customer.id}
                      onClick={() => {
                        selectCustomerHandler(customer);
                        setSelectedAddress({});
                      }}>
                      {customer.first_name} {customer.last_name}
                      <span className="float-right">{customer.phone_no}</span>
                    </div>
                  )}
                />
              </CCol>
              <CCol sm="12" md="4" className="py-2 align-self-center">
                {orderDetail.customer_id ? (
                  <Chip
                    label={`[${orderDetail.customer_id}] ${orderDetail?.first_name} ${orderDetail?.last_name}`}
                    closeHandler={() => {
                      removeCustomerHandler();
                    }}
                  />
                ) : (
                  <Chip label="New Customer" color="success" />
                )}
              </CCol>
            </CFormGroup>
          }
          CustomerAddressAutocomplete={
            orderDetail.customer_id ? (
              <CCol sm="12" className="py-2">
                <CSelect
                  name="customer_address"
                  id="customer_address"
                  value={jsonStringifySafe(selectedAddress)}
                  onChange={selectCustomerAddressHandler}>
                  <option>Customer Addresses</option>
                  {addressList.map((addr: any) => (
                    <option key={addr.id} value={JSON.stringify(addr)}>
                      {formatAddress(addr)}
                    </option>
                  ))}
                </CSelect>
              </CCol>
            ) : null
          }
          GooglePlaceAutocomplete={
            <CCol sm="12" className="py-2">
              <GooglePlaceAutocomplete
                onSelectPlace={(googlePlaceObject: any) => {
                  selectAddressHandler(googlePlaceObject);
                  setSelectedAddress({});
                }}
              />
              {orderDetail.coordinate ? (
                <span className="text-success">
                  {`${orderDetail.coordinate.lat}, ${orderDetail.coordinate.lng}`}
                </span>
              ) : (
                <span className="text-danger">
                  *Google location not found, please select a valid place
                </span>
              )}
            </CCol>
          }
        />
      </CModalBody>
    </CModal>
  );
};

export default React.memo(OrderDetailModal);

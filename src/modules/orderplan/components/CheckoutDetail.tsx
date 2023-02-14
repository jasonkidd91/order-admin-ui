import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import {
  getCustomerAddresses,
  getStoreSlots,
  searchCustomers,
  setCurrentStep,
  setOrderDetail,
  setSelectedStore,
} from '../redux/planSlice';
import { CCard, CCardBody, CCol, CFormGroup, CSelect } from '@coreui/react';
import OrderCheckout from 'src/components/OrderCheckout';
import Autocomplete from 'src/components/Autocomplete';
import Chip from 'src/components/Chip';
import GooglePlaceAutocomplete from 'src/components/GooglePlaceAutocomplete';
import { globalToast } from 'src/redux/slice';
import { formatAddress, jsonParseSafe, jsonStringifySafe } from 'src/helpers';

let timer: NodeJS.Timeout;

const CheckoutDetail = () => {
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  const [isLoadingCustomer, setIsLoadingCustomer] = React.useState(false);
  const [customerList, setCustomerList] = React.useState([]);
  const [addressList, setAddressList] = React.useState([]);
  const [selectedAddress, setSelectedAddress] = React.useState<any>({});
  const [auth, planState] = useSelector((state: any) => [state.auth, state.plan] as const);
  const {
    currentStep,
    availableStores,
    availableSlots,
    selectedPlan,
    selectedStore,
    cartList,
    orderDetail,
  } = planState;

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

  const submitOrderHandler = () => {
    dispatch(setCurrentStep(currentStep + 1));
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
    <CCard>
      <CCardBody>
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
          isPlan
          selectedPlan={selectedPlan}
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
      </CCardBody>
    </CCard>
  );
};

export default React.memo(CheckoutDetail);

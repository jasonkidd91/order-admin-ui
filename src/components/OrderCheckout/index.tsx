import React from 'react';
import {
  CButton,
  CContainer,
  CCol,
  CRow,
  CFormGroup,
  CLabel,
  CInputRadio,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter,
  CInputGroup,
  CInput,
  CSelect,
  CCollapse,
  CLink,
  CForm,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import InputModal, { useInputModal } from 'src/components/Modal/InputModal';
import {
  formatAddress,
  formatPrice,
  getItemTotalPrice,
  getItemUnitPrice,
  jsonParseSafe,
  jsonStringifySafe,
  sumItemsPrice,
} from 'src/helpers';

interface RequiredProps {
  switchStoreHandler: React.FormEventHandler;
  switchDeliveryMethodHandler: React.FormEventHandler;
  updateOrderDetailHandler: (key: string, value: any) => void;
  submitOrderHandler: Function;
  CustomerAutocomplete?: React.ReactElement<any> | null;
  CustomerAddressAutocomplete?: React.ReactElement<any> | null;
  GooglePlaceAutocomplete?: React.ReactElement<any> | null;
  availableStores: any[];
  availableSlots: any[];
  selectedStore: any;
  cartList: any[];
  orderDetail: any;
  noValidate?: boolean;
}

type CheckoutProps =
  | (RequiredProps & { isPlan?: false; selectedPlan?: any })
  | (RequiredProps & { isPlan: true; selectedPlan: any });

const OrderCheckout = (props: CheckoutProps) => {
  const {
    switchStoreHandler,
    switchDeliveryMethodHandler,
    updateOrderDetailHandler,
    submitOrderHandler,
    CustomerAutocomplete,
    CustomerAddressAutocomplete,
    GooglePlaceAutocomplete,
    availableStores,
    availableSlots,
    selectedStore,
    cartList,
    orderDetail,
    noValidate,
    isPlan,
    selectedPlan,
  } = props;
  const [showOrder, setShowOrder] = React.useState(true);
  const { state: inputModalState, openModal, closeModal } = useInputModal();

  const onOrderDetailChange = (ev: any) => {
    const { name, value } = ev.target;
    let parsedValue = jsonParseSafe(value, value);
    updateOrderDetailHandler(name, parsedValue);
  };

  const editDeliveryFeesHandler = () => {
    openModal({
      show: true,
      title: 'Delivery Fees',
      placeholder: 'Enter delivery fees',
      value: orderDetail.delivery_charge || 0.0,
      size: 'sm',
      closeHandler: closeModal,
      submitHandler: (res: any) => {
        updateOrderDetailHandler('delivery_charge', Number(res));
        closeModal();
      },
    });
  };

  const editDiscountHandler = () => {
    openModal({
      show: true,
      title: 'Disocunt',
      placeholder: 'Enter discount',
      value: orderDetail.discount_amount || 0.0,
      size: 'sm',
      closeHandler: closeModal,
      submitHandler: (res: any) => {
        updateOrderDetailHandler('discount_amount', Number(res));
        closeModal();
      },
    });
  };

  const getSubTotal = () =>
    isPlan ? getItemUnitPrice(selectedPlan) + sumItemsPrice(cartList) : sumItemsPrice(cartList);

  const getTotal = () =>
    Math.max(
      getSubTotal() + Number(orderDetail.delivery_charge) - Number(orderDetail.discount_amount),
      0,
    );

  return (
    <>
      {inputModalState.show && <InputModal {...inputModalState} />}

      <CContainer className="px-0">
        <CForm
          noValidate={noValidate}
          onSubmit={(ev: any) => {
            ev.preventDefault();
            submitOrderHandler();
          }}>
          <CRow>
            <CCol>
              <CCard>
                <CCardBody className="bg-danger">
                  <CFormGroup row>
                    <CCol>
                      <CInputGroup>
                        <CSelect
                          required
                          name="select"
                          id="select"
                          value={jsonStringifySafe(selectedStore)}
                          onChange={switchStoreHandler}>
                          <option disabled={!!selectedStore}>Select store</option>
                          {availableStores.map((store: any) => (
                            <option key={store.id} value={JSON.stringify(store)}>
                              {store.name}
                            </option>
                          ))}
                        </CSelect>
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                  <div>{formatAddress(selectedStore)}</div>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCard accentColor="danger" className="mb-0">
                <CCardHeader>
                  {/* <DeliveryMethod > */}
                  <CRow>
                    <CCol>
                      <CLabel className="font-weight-bold pr-3">Order Method: </CLabel>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          required
                          custom
                          id="inline-radio1"
                          name="inline-radios"
                          value={1}
                          checked={Number(orderDetail.slot_type) === 1}
                          onChange={switchDeliveryMethodHandler}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio1">
                          Delivery
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          required
                          custom
                          id="inline-radio2"
                          name="inline-radios"
                          value={2}
                          checked={Number(orderDetail.slot_type) === 2}
                          onChange={switchDeliveryMethodHandler}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="inline-radio2">
                          Pickup
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CRow>
                  {/* </DeliveryMethod > */}
                </CCardHeader>
                <CCardBody>
                  {/* <CustomerInfo > */}
                  <div>
                    <h5>Customer Info</h5>
                    {CustomerAutocomplete}
                    <CFormGroup row>
                      <CCol sm="12" md="6" className="py-2">
                        <CLabel htmlFor="first_name" required>
                          First Name
                        </CLabel>
                        <CInput
                          required
                          id="first_name"
                          name="first_name"
                          value={orderDetail.first_name}
                          placeholder="Customer first name"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      <CCol sm="12" md="6" className="py-2">
                        <CLabel htmlFor="last_name">Last Name</CLabel>
                        <CInput
                          id="last_name"
                          name="last_name"
                          value={orderDetail.last_name}
                          placeholder="Customer last name"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      <CCol sm="12" md="6" className="py-2">
                        <CLabel htmlFor="email">Email</CLabel>
                        <CInput
                          id="email"
                          name="email"
                          value={orderDetail.email}
                          placeholder="Customer email"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      <CCol sm="12" md="6" className="py-2">
                        <CLabel htmlFor="phone_no" required>
                          Phone
                        </CLabel>
                        <CInput
                          required
                          id="phone_no"
                          name="phone_no"
                          value={orderDetail.phone_no}
                          placeholder="Customer phone"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      <CCol sm="12" md="6" className="py-2">
                        <CLabel htmlFor="recipient_name">Recipient Name</CLabel>
                        <CInput
                          id="recipient_name"
                          name="recipient_name"
                          value={orderDetail.recipient_name}
                          placeholder="Leave blank if same as above"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      <CCol sm="12" md="6" className="py-2">
                        <CLabel htmlFor="recipient_phone_number">Recipient Phone</CLabel>
                        <CInput
                          id="recipient_phone_number"
                          name="recipient_phone_number"
                          value={orderDetail.recipient_phone_number}
                          placeholder="Leave blank if same as above"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                    </CFormGroup>
                  </div>
                  {/* </CustomerInfo > */}

                  {/* <DeliveryAddress > */}
                  {Number(orderDetail.slot_type) === 1 && (
                    <>
                      <hr />
                      <div>
                        <h5>Delivery Address</h5>
                        <CFormGroup row>
                          {CustomerAddressAutocomplete}
                          {GooglePlaceAutocomplete}
                          <CCol sm="12" md="6" className="py-2">
                            <CLabel
                              htmlFor="delivery_address_1"
                              required={Number(orderDetail.slot_type) === 1}>
                              Address
                            </CLabel>
                            <CInput
                              required={Number(orderDetail.slot_type) === 1}
                              id="delivery_address_1"
                              name="delivery_address_1"
                              value={orderDetail.delivery_address_1}
                              placeholder="Address"
                              onChange={onOrderDetailChange}
                              disabled={false}
                            />
                          </CCol>
                          {/* <CCol sm="12" md="6" className="py-2">
                          <CLabel htmlFor="delivery_address_2">Address 2</CLabel>
                          <CInput
                            id="delivery_address_2"
                            name="delivery_address_2"
                            value={orderDetail.delivery_address_2}
                            placeholder="Address 2"
                            onChange={onOrderDetailChange}
                            disabled={true}
                          />
                        </CCol> */}
                          {/* <CCol sm="12" md="6" className="py-2">
                          <CLabel htmlFor="delivery_address_3">Address 3</CLabel>
                          <CInput
                            id="delivery_address_3"
                            name="delivery_address_3"
                            value={orderDetail.delivery_address_3}
                            placeholder="Address 3"
                            onChange={onOrderDetailChange}
                            disabled={true}
                          />
                        </CCol> */}
                          <CCol sm="12" md="6" className="py-2">
                            <CLabel
                              htmlFor="delivery_postal"
                              required={Number(orderDetail.slot_type) === 1}>
                              Postal
                            </CLabel>
                            <CInput
                              required={Number(orderDetail.slot_type) === 1}
                              id="delivery_postal"
                              name="delivery_postal"
                              value={orderDetail.delivery_postal}
                              placeholder="Postal"
                              onChange={onOrderDetailChange}
                              disabled={false}
                            />
                          </CCol>
                          <CCol sm="12" md="6" className="py-2">
                            <CLabel
                              htmlFor="delivery_city"
                              required={Number(orderDetail.slot_type) === 1}>
                              City
                            </CLabel>
                            <CInput
                              required={Number(orderDetail.slot_type) === 1}
                              id="delivery_city"
                              name="delivery_city"
                              value={orderDetail.delivery_city}
                              placeholder="City"
                              onChange={onOrderDetailChange}
                              disabled={false}
                            />
                          </CCol>
                          <CCol sm="12" md="6" className="py-2">
                            <CLabel
                              htmlFor="delivery_state"
                              required={Number(orderDetail.slot_type) === 1}>
                              State
                            </CLabel>
                            <CInput
                              required={Number(orderDetail.slot_type) === 1}
                              id="delivery_state"
                              name="delivery_state"
                              value={orderDetail.delivery_state}
                              placeholder="State"
                              onChange={onOrderDetailChange}
                              disabled={false}
                            />
                          </CCol>
                          <CCol sm="12" md="6" className="py-2">
                            <CLabel
                              htmlFor="delivery_country"
                              required={Number(orderDetail.slot_type) === 1}>
                              Country
                            </CLabel>
                            <CInput
                              required={Number(orderDetail.slot_type) === 1}
                              id="delivery_country"
                              name="delivery_country"
                              value={orderDetail.delivery_country}
                              placeholder="Country"
                              onChange={onOrderDetailChange}
                              disabled={true}
                            />
                          </CCol>
                          <CCol sm="12" md="6" className="py-2">
                            <CLabel htmlFor="delivery_remark">Delivery Remarks</CLabel>
                            <CInput
                              id="delivery_remark"
                              name="delivery_remark"
                              value={orderDetail.delivery_remark}
                              placeholder="Leave blank if no remarks"
                              onChange={onOrderDetailChange}
                            />
                          </CCol>
                        </CFormGroup>
                      </div>
                    </>
                  )}
                  {/* </DeliveryAddress > */}

                  {/* <DeliveryDateTime > */}
                  <hr />
                  <div>
                    <h5>Delivery Date and Slot</h5>
                    <CFormGroup row>
                      <CCol className="py-2">
                        <CLabel htmlFor="delivery_date" required>
                          Date
                        </CLabel>
                        <CInput
                          required
                          id="delivery_date"
                          name="delivery_date"
                          value={orderDetail.delivery_date}
                          // min={formatDate(currentDate(), 'YYYY-MM-DD')}
                          type="date"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      <CCol className="py-2">
                        <CLabel htmlFor="slot_id" required>
                          Slot
                        </CLabel>
                        <CSelect
                          required
                          name="slot_id"
                          id="slot_id"
                          value={orderDetail.slot_id}
                          onChange={onOrderDetailChange}>
                          <option value="">Select slot</option>
                          {availableSlots
                            .filter((slot: any) => slot.slot_type === Number(orderDetail.slot_type))
                            .map((slot: any) => (
                              <option key={slot.id} value={slot.id}>
                                {`${slot.slot_start} - ${slot.slot_end}`}
                              </option>
                            ))}
                        </CSelect>
                      </CCol>
                    </CFormGroup>
                  </div>
                  {/* </DeliveryDateTime > */}

                  {/* <DeliveryNotes > */}
                  <hr />
                  <div>
                    <h5>Delivery Notes</h5>
                    <CFormGroup row>
                      <CCol className="py-2">
                        <CLabel htmlFor="customer_remark">Customer Remarks</CLabel>
                        <CInput
                          id="customer_remark"
                          name="customer_remark"
                          value={orderDetail.customer_remark}
                          placeholder="Leave blank if no remarks"
                          onChange={onOrderDetailChange}
                        />
                      </CCol>
                      {/* <CCol className="py-2">
                      <CLabel htmlFor="kitchen_remark">Kitchen Remarks</CLabel>
                      <CInput
                        id="kitchen_remark"
                        name="kitchen_remark"
                        value={orderDetail.kitchen_remark}
                        placeholder="Leave blank if no remarks"
                        onChange={onOrderDetailChange}
                      />
                    </CCol> */}
                    </CFormGroup>
                  </div>
                  {/* </DeliveryNotes > */}

                  {/* <OrderSummary > */}
                  <hr />
                  <div>
                    <div>
                      <div className="d-flex">
                        <h5> Order Summary</h5>
                        <CLink className="px-1" onClick={() => setShowOrder(!showOrder)}>
                          ({showOrder ? 'hide' : 'show'})
                        </CLink>
                      </div>
                    </div>
                    <CCollapse show={showOrder}>
                      <CCard color="light">
                        <CCardBody>
                          {isPlan && (
                            <div className="d-flex justify-content-between">
                              <h5>Plan: {selectedPlan.description}</h5>
                              <small>{formatPrice(getItemUnitPrice(selectedPlan))}</small>
                            </div>
                          )}
                          {cartList.map((item: any, idx: number) => (
                            <div
                              className="d-flex justify-content-between"
                              key={`${item.id}-${idx}`}>
                              <span>
                                {`${idx + 1}. ${item.name} ${
                                  item.variant ? ' - ' + item.variant.description : ''
                                } (x${item.quantity || 1})`}
                              </span>
                              {<small>{formatPrice(getItemTotalPrice(item))}</small>}
                            </div>
                          ))}
                        </CCardBody>
                      </CCard>
                    </CCollapse>
                    <div className="d-flex">
                      <strong>SubTotal</strong>
                      <strong className="ml-auto">{formatPrice(getSubTotal())}</strong>
                    </div>
                    <div className="d-flex">
                      <strong>
                        Delivery Fees{' '}
                        <CIcon
                          name="cil-pencil"
                          className="text-danger pointer"
                          onClick={editDeliveryFeesHandler}
                        />
                      </strong>
                      <strong className="ml-auto">
                        {formatPrice(orderDetail.delivery_charge)}
                      </strong>
                    </div>
                    <div className="d-flex">
                      <strong>
                        Discount{' '}
                        <CIcon
                          name="cil-pencil"
                          className="text-danger pointer"
                          onClick={editDiscountHandler}
                        />
                      </strong>
                      <strong className="ml-auto text-danger">
                        - {formatPrice(orderDetail.discount_amount)}
                      </strong>
                    </div>
                    <div className="d-flex">
                      <strong>Total</strong>
                      <strong className="ml-auto">{formatPrice(getTotal())}</strong>
                    </div>
                  </div>
                  {/* </OrderSummary > */}
                </CCardBody>
                <CCardFooter>
                  <CButton type="submit" color="danger" block>
                    Submit Order
                  </CButton>
                </CCardFooter>
              </CCard>
            </CCol>
          </CRow>
        </CForm>
      </CContainer>
    </>
  );
};

export default React.memo(OrderCheckout);

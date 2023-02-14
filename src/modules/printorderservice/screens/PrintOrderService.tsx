import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reduxStore from 'src/redux/store';
import { globalToast } from 'src/redux/slice';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CInputRadio,
  CLabel,
  CRow,
  CSpinner,
  CDataTable,
} from '@coreui/react';
import { useHistory } from 'react-router-dom';
import { currentDate, formatDate } from 'src/helpers';

import {
  getStoreSlots,
  getStores,
  getPrintOrder,
  printOrder,
} from '../redux/printOrderServiceSlice';

const PrintOrderService = () => {
  const history = useHistory();
  const dispatch = useDispatch<typeof reduxStore.dispatch>();
  // eslint-disable-next-line
  const [remark, setRemark] = React.useState('');
  // eslint-disable-next-line
  const [selectedDate, setSelectedDate] = React.useState(formatDate(currentDate(), 'YYYY-MM-DD'));
  const [selectedSlots, setSelectedSlots] = React.useState<any>([]);

  const [loader, setLoader] = React.useState(false);
  const {
    auth,
    // availableDrivers = [],
    availableSlots = [],
    availableStores = [],
    records = [],
  } = useSelector((state: any) => {
    return {
      auth: state.auth,
      // availableDrivers: state.printOrderService.deliveryDriverList,
      availableSlots: state.printOrderService.availableSlots,
      availableStores: state.printOrderService.stores,
      records: state.printOrderService.orderList,
    };
  });

  const fields = [
    {
      key: 'id',
      label: 'Order ID',
    },
    {
      key: 'delivery_date',
      label: 'Delivery Date',
    },
    {
      key: 'delivery_time',
      label: 'Delivery Time',
    },
    {
      key: 'customer_name',
      label: 'Customer Name',
    },
    {
      key: 'customer_phone_number',
      label: 'Contact',
    },
    {
      key: 'address',
      label: 'Address',
    },
    {
      key: 'delivery_postal',
      label: 'Postal Code',
    },
    {
      key: 'delivery_city',
      label: 'City',
    },
    {
      key: 'item',
      label: 'Item',
    },
    // {
    //   key: 'total_amount',
    //   label: 'Total Amount',
    // },
    {
      key: 'remarks',
      label: 'Remarks',
    },
  ];

  const init = () => {
    // initialize effect
    try {
      // dispatch(getDeliveryDriverList(auth, null));
      dispatch(getStoreSlots(auth));
      dispatch(getStores(auth));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  const [selectedDrivers, setSelectedDrivers] = React.useState([] as any);

  const [deliveryPlanState, setDeliveryPlanState] = React.useState({
    delivery_date: selectedDate,
    slot_id: selectedSlots,
    driver_list: selectedDrivers,
    remark,
    sort_by: 'delivery_date',
    group_area: false,
  });

  const handleSlotChange = (ev: any) => {
    const { checked, value } = ev.target;
    if (checked) {
      selectedSlots.push(Number(value));
    } else {
      // const existedIdx = selectedSlots.findIndex((slotId: any) => slotId === value);
      const existedIdx = selectedSlots.indexOf(Number(value));
      if (existedIdx >= 0) {
        selectedSlots.splice(existedIdx, 1);
      }
    }
    setSelectedSlots([...selectedSlots]);
    setDeliveryPlanState({ ...deliveryPlanState, slot_id: [...selectedSlots] });
  };

  // eslint-disable-next-line
  const toggleDriver = (driver: any) => {
    const existedIdx = selectedDrivers.indexOf(driver);
    if (existedIdx >= 0) {
      selectedDrivers.splice(existedIdx, 1);
    } else {
      selectedDrivers.push(driver);
    }
    setSelectedDrivers([...selectedDrivers]);
    setDeliveryPlanState({ ...deliveryPlanState, driver_list: [...selectedDrivers] });
  };

  // eslint-disable-next-line
  const validateForm = () => {
    console.log(selectedDate, selectedSlots, selectedDrivers);
    // validate date
    if (!selectedDate) {
      dispatch(globalToast('error', 'Date is required'));
      return false;
    }

    // validate slots
    if (selectedSlots.length <= 0) {
      dispatch(globalToast('error', 'At least one slot must be selected'));
      return false;
    }

    // validate drivers
    if (selectedDrivers.length <= 0) {
      dispatch(globalToast('error', 'At least one driver must be selected'));
      return false;
    }

    return true;
  };

  const search = async () => {
    // setDeliveryPlanState()
    // if (validateForm()) {
    // proceed to generate
    // history.push(DeliveryPreparationRoute.DETAIL.path.replace(':id', 'IdIsSomethingBlaBla'));
    // }
    try {
      // setLoader(true);
      // alert("test");
      dispatch(getPrintOrder(auth, deliveryPlanState));
      // setLoader(false);
      // dispatch(globalToast('success', 'Delivery Plan Data Created!'));
      // history.replace(DeliveryPreparationRoute.DETAIL.path.replace(':id', res.id));
    } catch (err: any) {
      dispatch(globalToast('error', err?.message));
    }
  };

  const print = async () => {
    // setDeliveryPlanState()
    // if (validateForm()) {
    // proceed to generate
    // history.push(DeliveryPreparationRoute.DETAIL.path.replace(':id', 'IdIsSomethingBlaBla'));
    // }
    try {
      setLoader(true);
      // alert("test");
      await printOrder(auth, deliveryPlanState);
      setLoader(false);
      dispatch(globalToast('success', 'Success sent to printer'));
      // dispatch(globalToast('success', 'Delivery Plan Data Created!'));
      // history.replace(DeliveryPreparationRoute.DETAIL.path.replace(':id', res.id));
    } catch (err: any) {
      setLoader(false);
      dispatch(globalToast('error', err?.message));
    }
  };

  const slotIsSelected = (slot: any) => {
    return selectedSlots.findIndex((slotId: any) => slotId === slot.id) >= 0;
  };

  // eslint-disable-next-line
  const driverIsSelected = (driver: any) => {
    return selectedDrivers.indexOf(driver) >= 0;
  };

  const onSortByChange = (event: any) => {
    const { name, value } = event.target;
    // alert("JS test " + value);
    // setOrderSearchState({ ...orderSearchState, [name]: value });
    setDeliveryPlanState({ ...deliveryPlanState, [name]: value });
  };

  return (
    <>
      <CCard accentColor="success">
        <CCardBody>
          <CRow className="py-2">
            <CCol>
              <div className="d-flex align-items-center">
                <h5>Print Order</h5>
                <div className="ml-auto"></div>
              </div>
            </CCol>
          </CRow>

          {/* <Remark Date Section> */}
          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  Remark <small>(max 50 characters)</small>:
                </CLabel>
                <CInput
                  id="remark"
                  value={deliveryPlanState.remark}
                  maxLength={50}
                  placeholder="Any Remark"
                  onChange={(ev: any) =>
                    setDeliveryPlanState({ ...deliveryPlanState, remark: ev.target.value })
                  }
                  className="shadow-sm"
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="date" className="font-weight-bold">
                  For Date:
                </CLabel>
                <CInput
                  id="date"
                  type="date"
                  value={deliveryPlanState.delivery_date}
                  onChange={(ev: any) =>
                    setDeliveryPlanState({ ...deliveryPlanState, delivery_date: ev.target.value })
                  }
                  className="shadow-sm"
                />
              </CFormGroup>
            </CCol>
          </CRow>
          {/* </Remark Date Section> */}

          <hr />

          {/* <Store And Slots Section> */}
          <CRow>
            <CCol xs="12">
              <CFormGroup>
                <CLabel className="font-weight-bold">For Stores - Slots:</CLabel>
                {availableStores.map((store: any, idx: number) => (
                  <CCard
                    key={store.id}
                    className={`shadow-sm ${idx + 1 === availableStores.length ? 'mb-0' : ''}`}>
                    <CCardBody className="py-2">
                      <CFormGroup row>
                        <CCol xs="12">
                          <CLabel>{store.name}</CLabel>
                        </CCol>
                        {availableSlots
                          .filter((slot: any) => slot.store_id === store.id)
                          .map((slot: any) => (
                            <CCol xs="12" sm="6" md="3" key={slot.id} className="pb-1">
                              <CFormGroup variant="checkbox" className="checkbox">
                                <CInputCheckbox
                                  id={`${store.id}${slot.id}`}
                                  name={`${store.id}-slotcheckbox`}
                                  value={slot.id}
                                  onChange={handleSlotChange}
                                />
                                <CLabel
                                  variant="checkbox"
                                  className={`form-check-label ${
                                    slotIsSelected(slot) ? 'font-weight-bold' : ''
                                  }`}
                                  htmlFor={`${store.id}${slot.id}`}>
                                  {slot.slot_start} - {slot.slot_end}
                                </CLabel>
                              </CFormGroup>
                            </CCol>
                          ))}
                      </CFormGroup>
                    </CCardBody>
                  </CCard>
                ))}
              </CFormGroup>
            </CCol>
          </CRow>
          {/* </Store And Slots Section> */}

          <CRow>
            <div>
              <CCol xs="12" className="d-flex flex-wrap">
                <CLabel className="font-weight-bold">Sort By:</CLabel>
                <CFormGroup variant="checkbox" className="pr-4">
                  <CInputRadio
                    className="form-check-input"
                    name="sort_by"
                    value="id"
                    onChange={onSortByChange}
                    id="cradio-sort-id"
                  />
                  <CLabel htmlFor="cradio-sort-id">Order Id</CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="pr-4">
                  <CInputRadio
                    className="form-check-input"
                    name="sort_by"
                    value="remarks"
                    onChange={onSortByChange}
                    id="cradio-sort-remarks"
                  />
                  <CLabel htmlFor="cradio-sort-remarks">Remarks</CLabel>
                </CFormGroup>
              </CCol>
            </div>
            <CCol xs="12" className="text-right">
              {loader && <CSpinner color="primary" />}
              <CButton color="danger" className="px-4 mr-4" onClick={() => search()}>
                Search
              </CButton>
              <CButton color="secondary" className="px-4 mr-4" onClick={() => history.goBack()}>
                Back
              </CButton>
              <CButton
                color="primary"
                className="px-4 mr-4"
                disabled={!records.length}
                onClick={() => print()}>
                Print
              </CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol xs="12" className="d-flex flex-wrap">
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="group_area"
                  name="group_area"
                  checked={deliveryPlanState.group_area}
                  onChange={() =>
                    setDeliveryPlanState({
                      ...deliveryPlanState,
                      group_area: !deliveryPlanState.group_area,
                    })
                  }
                />
                <CLabel variant="checkbox" className="form-check-label" htmlFor="group_area">
                  Group Area Of Empty Remarks Order
                </CLabel>
              </CFormGroup>
            </CCol>
          </CRow>
          <hr />

          {/* <Driver Section> */}
          <CRow>
            <CCol xs="12">
              <CDataTable
                items={records}
                fields={fields}
                hover
                striped
                border
                responsive
                scopedSlots={{
                  item: (item: any) => {
                    return (
                      <td>
                        <ul>
                          {item.order_details.map((item_detail: any, idx: number) => {
                            return (
                              <li key={idx}>
                                {item_detail.item_description} x {item_detail.item_quantity}
                              </li>
                            );
                          })}
                        </ul>
                      </td>
                    );
                  },
                }}
              />
            </CCol>
          </CRow>
          <CFormGroup row className="my-0">
            <CCol xs="12">
              <CLabel className={'font-weight-bold'}>
                List of Order Result : {records?.length}
              </CLabel>
            </CCol>
          </CFormGroup>
          {/* </Driver Section> */}

          <hr />
        </CCardBody>
      </CCard>
    </>
  );
};

export default PrintOrderService;
